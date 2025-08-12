const express = require('express');
const { getDb } = require('../database/db');
const router = express.Router();

// Generate order reference
const generateOrderReference = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'SC-';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Create new order
router.post('/', (req, res) => {
  const db = getDb();
  const { customerName, customerEmail, customerPhone, items, notes } = req.body;
  
  // Validation
  if (!customerName || !customerEmail || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ 
      error: 'Missing required fields: customerName, customerEmail, and items' 
    });
  }
  
  const reference = generateOrderReference();
  
  // Calculate total
  const productIds = items.map(item => item.productId);
  const placeholders = productIds.map(() => '?').join(',');
  
  db.all(
    `SELECT id, price FROM products WHERE id IN (${placeholders}) AND is_active = 1`,
    productIds,
    (err, products) => {
      if (err) {
        console.error('Error fetching products for order:', err);
        return res.status(500).json({ error: 'Failed to process order' });
      }
      
      if (products.length !== items.length) {
        return res.status(400).json({ error: 'Some products are not available' });
      }
      
      // Calculate total and prepare order items
      let total = 0;
      const orderItems = items.map(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) {
          throw new Error(`Product ${item.productId} not found`);
        }
        const lineTotal = product.price * item.quantity;
        total += lineTotal;
        return {
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: product.price
        };
      });
      
      // Insert order
      db.run(
        `INSERT INTO orders (reference, customer_name, customer_email, customer_phone, total, notes)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [reference, customerName, customerEmail, customerPhone, total, notes || null],
        function(err) {
          if (err) {
            console.error('Error creating order:', err);
            return res.status(500).json({ error: 'Failed to create order' });
          }
          
          const orderId = this.lastID;
          
          // Insert order items
          const stmt = db.prepare(
            'INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)'
          );
          
          orderItems.forEach(item => {
            stmt.run(orderId, item.productId, item.quantity, item.unitPrice);
          });
          
          stmt.finalize((err) => {
            if (err) {
              console.error('Error creating order items:', err);
              return res.status(500).json({ error: 'Failed to create order items' });
            }
            
            res.status(201).json({
              id: orderId,
              reference,
              total,
              message: 'Order created successfully!'
            });
          });
        }
      );
    }
  );
});

module.exports = router;
