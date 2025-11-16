// server.js - Complete Express REST API for Products

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// ---------------- MIDDLEWARES ----------------

// Parse JSON request bodies
app.use(bodyParser.json());

// Custom request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Simple authentication middleware
const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey === 'mysecretkey') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized. Invalid or missing API key.' });
  }
};

// ---------------- SAMPLE DATA ----------------

let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true,
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true,
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false,
  },
];

// ---------------- ROUTES ----------------

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// GET all products (with optional category filter & pagination)
app.get('/api/products', (req, res) => {
  const { category, page = 1, limit = 5, search } = req.query;
  let filtered = [...products];

  if (category) {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Pagination
  const start = (page - 1) * limit;
  const end = start + parseInt(limit);
  const paginated = filtered.slice(start, end);

  res.json({
    total: filtered.length,
    page: Number(page),
    limit: Number(limit),
    data: paginated,
  });
});

// GET product by ID
app.get('/api/products/:id', (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    const err = new Error('Product not found');
    err.status = 404;
    return next(err);
  }
  res.json(product);
});

// POST create new product (requires auth)
app.post('/api/products', authenticate, (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || !price || !category) {
    const err = new Error('Missing required fields');
    err.status = 400;
    return next(err);
  }

  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock: inStock ?? true,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update existing product (requires auth)
app.put('/api/products/:id', authenticate, (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    const err = new Error('Product not found');
    err.status = 404;
    return next(err);
  }

  const updated = { ...products[index], ...req.body };
  products[index] = updated;
  res.json(updated);
});

// DELETE a product (requires auth)
app.delete('/api/products/:id', authenticate, (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    const err = new Error('Product not found');
    err.status = 404;
    return next(err);
  }

  products.splice(index, 1);
  res.json({ message: 'Product deleted successfully' });
});

// GET product statistics
app.get('/api/stats', (req, res) => {
  const stats = {};
  for (const product of products) {
    stats[product.category] = (stats[product.category] || 0) + 1;
  }
  res.json({ totalProducts: products.length, countByCategory: stats });
});

// ---------------- ERROR HANDLING ----------------

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ error: err.message || 'Internal Server Error' });
});

// ---------------- SERVER START ----------------

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app;
