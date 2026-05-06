require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(express.json());

// Simple Route Example (You would usually put these in a separate routes/ folder)
// For Buku CRUD
app.use('/api/buku', require('./routes/bukuRoutes')); 
// For Peminjaman CRUD
app.use('/api/peminjaman', require('./routes/peminjamanRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));