require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const wishlistRoutes = require('./routes/wishlist');
require('./cron'); // Start cron

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true, cookie: { secure: false } }));

mongoose.connect(process.env.MONGODB_URI);

app.use('/api/auth', authRoutes);
app.use('/api/wishlist', wishlistRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));