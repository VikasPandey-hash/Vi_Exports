import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders')
      .then((response) => setOrders(response.data))
      .catch((error) => console.error('Error fetching orders:', error));
  }, []);

  return (
    <div>
      <h1>Admin Orders</h1>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <ul>
          {orders.map((order, idx) => (
            <li key={idx}>
              <p>Product: {order.product.name}</p>
              <p>Size: {order.size}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Date: {new Date(order.date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Admin;
