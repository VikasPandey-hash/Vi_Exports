const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Load product data
const products = JSON.parse(fs.readFileSync('products.json'));

// Endpoint to get all products
app.get('/api/products', (req, res) => {
  console.log(products);
  res.json(products);
});

// Endpoint to get product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Product not found');
  
  res.json(product);
});

// Endpoint to handle order submission
let orders = [];

app.post('/api/order', (req, res) => {
  const { productId, size, quantity } = req.body;
  const product = products.find(p => p.id === productId);

  if (product) {
    const selectedSize = product.sizes.find(s => s.size === size);
    if (selectedSize && selectedSize.quantity >= quantity) {
      selectedSize.quantity -= quantity;
      fs.writeFileSync('products.json', JSON.stringify(products, null, 2));

      // Store the order in memory (or persist it to a file/db)
      const order = { product, size, quantity, date: new Date() };
      orders.push(order);
      res.json({ message: 'Order placed successfully!', order });
    } else {
      res.status(400).json({ message: 'Insufficient stock' });
    }
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Admin endpoint to get all orders
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
