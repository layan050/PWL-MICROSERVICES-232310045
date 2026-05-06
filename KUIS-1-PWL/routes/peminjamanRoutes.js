const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/peminjamanController');

// Check these names carefully!
router.get('/', ctrl.getAllPeminjaman);            // Line 6
router.get('/:id', ctrl.getPeminjamanById);        // Line 7
router.post('/', ctrl.createPeminjaman);           // Line 8
router.put('/:id', ctrl.updatePeminjaman);         // Line 9
router.delete('/:id', ctrl.deletePeminjaman);     // Line 10

module.exports = router;