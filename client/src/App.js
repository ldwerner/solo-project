import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Wishlist from './components/Wishlist';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState('login');

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      await axios.get('/api/auth/check');
      setIsLoggedIn(true);
      setView('wishlist');
    } catch {
      setIsLoggedIn(false);
      setView('login');
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setView('wishlist');
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      setIsLoggedIn(false);
      setView('login');
      toast.success('Logged out');
    } catch (err) {
      toast.error('Logout failed');
    }
  };

  if (view === 'login') return (
    <div className="app">
      <Login onLogin={handleLogin} />
      <ToastContainer />
    </div>
  );

  return (
    <div className="app">
      <header>
        <h1>Wishlist App</h1>
        <button onClick={handleLogout}>Log Out</button>
      </header>
      <Wishlist onAdd={() => setView('add')} />
      <ToastContainer />
    </div>
  );
}

export default App;