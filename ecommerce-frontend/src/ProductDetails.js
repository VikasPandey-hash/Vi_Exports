import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.log('Error fetching product', error));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ product, selectedSize, quantity });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart');
  };

  const handleBuyNow = () => {
    axios.post('http://localhost:5000/api/order', {
      productId: product.id,
      size: selectedSize,
      quantity
    })
      .then(() => alert('Order placed successfully!'))
      .catch(() => alert('Order failed'));
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <label>
        Select Size:
        <select onChange={(e) => setSelectedSize(e.target.value)}>
          <option value="">Select size</option>
          {product.sizes.map((size, idx) => (
            <option key={idx} value={size.size}>
              {size.size} (Available: {size.quantity})
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Quantity:
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      </label>
      <br />
      <button onClick={handleAddToCart}>Add to Cart</button>
      <button onClick={handleBuyNow}>Buy Now</button>
    </div>
  );
};

export default ProductDetails;
