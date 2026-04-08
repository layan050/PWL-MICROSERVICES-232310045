require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // Middleware to parse JSON

// MongoDB Connection
// NEW FIXED CODE
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/user_management')
  .then(() => console.log('✓ Connected to MongoDB'))
  .catch(err => console.error('Database connection error:', err));
// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`✓ Server running on port ${PORT}`);
});