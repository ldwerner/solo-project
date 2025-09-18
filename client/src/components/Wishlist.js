import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Wishlist({ onAdd }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get('/api/wishlist');
      setItems(res.data);
      res.data.forEach(item => {
        if (item.onSale) toast.info(`${item.title} is on sale! $${item.currentPrice}`);
      });
    } catch (err) {
      toast.error('Error fetching wishlist');
    }
  };

  return (
    <div>
      <h1>Wishlist</h1>
      <button onClick={onAdd}>Add Item</button>
      <button onClick={fetchItems}>Refresh Prices</button>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            <strong>{item.title}</strong> - Current: ${item.currentPrice} (Initial: ${item.initialPrice}) - Last: {new Date(item.lastChecked).toLocaleDateString()}
            {item.onSale && <span> 🎉 On Sale!</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Wishlist;