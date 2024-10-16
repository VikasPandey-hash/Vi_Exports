import React from 'react';
import ReactDOM from 'react-dom/client';  // Updated import
import './index.css';
import App from './App';
import ProductDetails from './ProductDetails';
import Cart from './Cart';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Create root

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />                  {/* Updated */}
      <Route path="/product/:id" element={<ProductDetails />} />  {/* Updated */}
      <Route path="/cart" element={<Cart />} />             {/* Updated */}
      <Route path="/admin" element={<Admin />} />           {/* Updated */}
    </Routes> 
  </Router>
);
