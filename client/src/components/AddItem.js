import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddItem({ onBack }) {
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/wishlist/add', { url });
      toast.success('Item added!');
      onBack();
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Paste URL" required />
        <button type="submit">Add to Wishlist</button>
      </form>
      <button onClick={onBack}>Back</button>
    </div>
  );
}

export default AddItem;