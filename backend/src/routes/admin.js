const express = require('express');
const bcrypt = require('bcryptjs');
const { getDb } = require('../database/db');
const router = express.Router();

// Middleware to check admin authentication
const requireAuth = (req, res, next) => {
  if (!req.session.adminId) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
};

// Admin login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  
  const db = getDb();
  db.get(
    'SELECT id, email, password_hash, name FROM admin_users WHERE email = ?',
    [email],
    (err, user) => {
      if (err) {
        console.error('Error fetching admin user:', err);
        return res.status(500).json({ error: 'Login failed' });
      }
      
      if (!user || !bcrypt.compareSync(password, user.password_hash)) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      req.session.adminId = user.id;
      req.session.adminEmail = user.email;
      req.session.adminName = user.name;
      
      res.json({
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });
    }
  );
});

// Admin logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

// Get current admin user
router.get('/me', requireAuth, (req, res) => {
  res.json({
    id: req.session.adminId,
    email: req.session.adminEmail,
    name: req.session.adminName
  });
});

// Get all orders
router.get('/orders', requireAuth, (req, res) => {
  const db = getDb();
  const { status } = req.query;
  
  let query = `
    SELECT o.*, 
           COUNT(oi.id) as item_count,
           GROUP_CONCAT(p.name || ' x' || oi.quantity) as items_summary
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    LEFT JOIN products p ON oi.product_id = p.id
  `;
  
  const params = [];
  if (status) {
    query += ' WHERE o.status = ?';
    params.push(status);
  }
  
  query += ' GROUP BY o.id ORDER BY o.created_at DESC';
  
  db.all(query, params, (err, orders) => {
    if (err) {
      console.error('Error fetching orders:', err);
      res.status(500).json({ error: 'Failed to fetch orders' });
    } else {
      res.json(orders);
    }
  });
});

// Get order details
router.get('/orders/:id', requireAuth, (req, res) => {
  const db = getDb();
  const { id } = req.params;
  
  // Get order details
  db.get(
    'SELECT * FROM orders WHERE id = ?',
    [id],
    (err, order) => {
      if (err) {
        console.error('Error fetching order:', err);
        return res.status(500).json({ error: 'Failed to fetch order' });
      }
      
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      
      // Get order items
      db.all(
        `SELECT oi.*, p.name as product_name, p.image_url
         FROM order_items oi
         JOIN products p ON oi.product_id = p.id
         WHERE oi.order_id = ?`,
        [id],
        (err, items) => {
          if (err) {
            console.error('Error fetching order items:', err);
            return res.status(500).json({ error: 'Failed to fetch order items' });
          }
          
          res.json({
            ...order,
            items
          });
        }
      );
    }
  );
});

// Update order status
router.put('/orders/:id/status', requireAuth, (req, res) => {
  const db = getDb();
  const { id } = req.params;
  const { status } = req.body;
  
  const validStatuses = ['pending', 'confirmed', 'baking', 'ready', 'completed', 'cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  
  db.run(
    'UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [status, id],
    function(err) {
      if (err) {
        console.error('Error updating order status:', err);
        return res.status(500).json({ error: 'Failed to update order status' });
      }
      
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }
      
      res.json({ message: 'Order status updated successfully' });
    }
  );
});

module.exports = router;
