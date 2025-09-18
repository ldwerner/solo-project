import React from 'react';

function ItemCard({ item, onDelete }) {
  return (
    <div className="item-card">
      <img src={item.imageUrl || 'https://dummyimage.com/150x150/ccc/000&text=No+Image'} alt={item.title} className="item-image" />
      <div className="item-details">
        <h3>{item.title}</h3>
        <p><strong>Current:</strong> ${item.currentPrice}</p>
        <p><strong>Initial:</strong> ${item.initialPrice}</p>
        <p><strong>Last Checked:</strong> {new Date(item.lastChecked).toLocaleDateString()}</p>
        {item.onSale && <span className="sale-badge">🎉 On Sale!</span>}
        <button onClick={() => onDelete(item._id)} className="delete-btn">Delete</button>
      </div>
    </div>
  );
}

export default ItemCard;