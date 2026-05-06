const mongoose = require('mongoose');

const BukuSchema = new mongoose.Schema({
    judul: { type: String, required: true },
    author: { type: String, required: true },
    tahun_terbit: { type: Number, required: true },
    stok: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Buku', BukuSchema);