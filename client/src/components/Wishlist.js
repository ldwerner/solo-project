import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ItemCard from './ItemCard';

function Wishlist({ onAdd }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/wishlist');
      setItems(res.data);
      if (res.data.length === 0) toast.info('No items in wishlist');
      res.data.forEach(item => {
        if (item.onSale) toast.info(`${item.title} is on sale! $${item.currentPrice}`);
      });
    } catch (err) {
      console.error('Fetch error:', err);  // Debug log
      toast.error('Error fetching wishlist: ' + err.message);
    } finally {
      setLoading(false);
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
        <button onClick={fetchItems} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh Prices'}
        </button>
      </div>
      <div className="items-grid">
        {items.length === 0 ? (
          <p>No items yet. Add one!</p>
        ) : (
          items.map(item => (
            <ItemCard key={item._id} item={item} onDelete={deleteItem} />
          ))
        )}
      </div>
    </div>
  );
}

export default Wishlist;