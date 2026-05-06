const Buku = require('../models/Buku');

// GET all books
exports.getAllBuku = async (req, res) => {
    try {
        const books = await Buku.find();
        res.json(books);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// GET book by ID
exports.getBukuById = async (req, res) => {
    try {
        const book = await Buku.findById(req.params.id);
        if (!book) return res.status(404).json({ msg: "Not found" });
        res.json(book);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// CREATE book
exports.createBuku = async (req, res) => {
    try {
        const newBook = new Buku(req.body);
        await newBook.save();
        res.status(201).json(newBook);
    } catch (err) { res.status(400).json({ error: err.message }); }
};

// UPDATE book
exports.updateBuku = async (req, res) => {
    try {
        const updated = await Buku.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) { res.status(400).json({ error: err.message }); }
};

// DELETE book
exports.deleteBuku = async (req, res) => {
    try {
        await Buku.findByIdAndDelete(req.params.id);
        res.json({ msg: "Book deleted" });
    } catch (err) { res.status(500).json({ error: err.message }); }
};