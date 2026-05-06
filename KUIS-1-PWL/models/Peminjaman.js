const mongoose = require('mongoose');

const PeminjamanSchema = new mongoose.Schema({
    id_buku: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Buku', 
        required: true 
    },
    nama_peminjam: { type: String, required: true },
    tanggal_pinjam: { type: Date, default: Date.now },
    is_return: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Peminjaman', PeminjamanSchema);