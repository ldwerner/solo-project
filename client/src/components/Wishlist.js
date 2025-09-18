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
    <div className="wishlist-container">
      <h1>Wishlist</h1>
      <div className="actions">
        <button onClick={onAdd}>Add Item</button>
        <button onClick={fetchItems}>Refresh Prices</button>
      </div>
      <div className="items-grid">
        {items.map(item => (
          <div key={item._id} className="item-card">
            <img src={item.imageUrl || 'https://via.placeholder.com/150?text=No+Image'} alt={item.title} className="item-image" />
            <div className="item-details">
              <h3>{item.title}</h3>
              <p><strong>Current:</strong> ${item.currentPrice}</p>
              <p><strong>Initial:</strong> ${item.initialPrice}</p>
              <p><strong>Last Checked:</strong> {new Date(item.lastChecked).toLocaleDateString()}</p>
              {item.onSale && <span className="sale-badge">🎉 On Sale!</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;