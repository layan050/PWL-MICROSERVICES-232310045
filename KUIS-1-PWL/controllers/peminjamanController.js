const Peminjaman = require('../models/Peminjaman');
const Buku = require('../models/Buku');

// 1. GET ALL
exports.getAllPeminjaman = async (req, res) => {
    try {
        const data = await Peminjaman.find().populate('id_buku');
        res.json(data);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// 2. GET BY ID
exports.getPeminjamanById = async (req, res) => {
    try {
        const data = await Peminjaman.findById(req.params.id);
        if (!data) return res.status(404).json({ msg: "Not found" });
        res.json(data);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// 3. POST (CREATE)
exports.createPeminjaman = async (req, res) => {
    try {
        const { id_buku, nama_peminjam } = req.body;
        const buku = await Buku.findById(id_buku);
        if (!buku || buku.stok <= 0) return res.status(400).json({ msg: "Stock empty or Book not found" });

        const newLoan = new Peminjaman(req.body);
        await newLoan.save();
        
        await Buku.findByIdAndUpdate(id_buku, { $inc: { stok: -1 } });
        res.status(201).json(newLoan);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// 4. PUT (UPDATE)
exports.updatePeminjaman = async (req, res) => {
    try {
        const loan = await Peminjaman.findById(req.params.id);
        if (!loan) return res.status(404).json({ msg: "Loan not found" });

        if (req.body.is_return === true && loan.is_return === false) {
            await Buku.findByIdAndUpdate(loan.id_buku, { $inc: { stok: 1 } });
        }
        const updated = await Peminjaman.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// 5. DELETE
exports.deletePeminjaman = async (req, res) => {
    try {
        await Peminjaman.findByIdAndDelete(req.params.id);
        res.json({ msg: "Deleted" });
    } catch (err) { res.status(500).json({ error: err.message }); }
};