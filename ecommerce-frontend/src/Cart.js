import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handleCheckout = () => {
    // Logic to handle checkout
    const handleCheckout = () => {
        cart.forEach(item => {
          const order = {
            productId: item.product.id,
            size: item.selectedSize,
            quantity: item.quantity
          };
          axios.post('http://localhost:5000/api/order', order)
            .then(() => alert('Order placed successfully for ' + item.product.name))
            .catch((error) => console.error('Error placing order:', error));
        });
      
        // Clear the cart after placing order
        localStorage.removeItem('cart');
        setCart([]);
      };
      
    alert('Proceed to checkout.');
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div>
          {cart.map((item, idx) => (
            <div key={idx}>
              <h2>{item.product.name}</h2>
              <p>Size: {item.selectedSize}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.product.price * item.quantity}</p>
            </div>
          ))}
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
