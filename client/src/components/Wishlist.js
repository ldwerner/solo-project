import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ItemCard from './ItemCard';

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

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`/api/wishlist/${itemId}`);
      setItems(items.filter(item => item._id !== itemId));
      toast.success('Item deleted');
    } catch (err) {
      toast.error('Delete failed');
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
          <ItemCard key={item._id} item={item} onDelete={deleteItem} />
        ))}
      </div>
    </div>
  );
}

export default Wishlist;