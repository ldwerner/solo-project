import React, { useState } from 'react';
import Login from './components/Login';
import AddItem from './components/AddItem';
import Wishlist from './components/Wishlist';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token')); // For simplicity; use sessions properly
  const [view, setView] = useState('login');

  const handleLogin = () => {
    setToken('logged-in'); // Simulate session
    setView('wishlist');
  };

  if (view === 'login') return <Login onLogin={handleLogin} />;
  if (view === 'add') return <AddItem onBack={() => setView('wishlist')} />;
  return <Wishlist onAdd={() => setView('add')} />;
}

export default App;