const express = require('express');
const { getDb } = require('../database/db');
const router = express.Router();

// Get all products
router.get('/', (req, res) => {
  const db = getDb();
  const { featured } = req.query;
  
  let query = 'SELECT * FROM products WHERE is_active = 1';
  if (featured === '1') {
    query += ' AND is_featured = 1';
  }
  query += ' ORDER BY created_at DESC';
  
  db.all(query, (err, products) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Failed to fetch products' });
    } else {
      res.json(products);
    }
  });
});

// Get product by slug
router.get('/:slug', (req, res) => {
  const db = getDb();
  const { slug } = req.params;
  
  db.get(
    'SELECT * FROM products WHERE slug = ? AND is_active = 1',
    [slug],
    (err, product) => {
      if (err) {
        console.error('Error fetching product:', err);
        res.status(500).json({ error: 'Failed to fetch product' });
      } else if (!product) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.json(product);
      }
    }
  );
});

module.exports = router;
