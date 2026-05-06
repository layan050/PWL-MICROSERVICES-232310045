const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/bukuController');

router.get('/', ctrl.getAllBuku);
router.get('/:id', ctrl.getBukuById);
router.post('/', ctrl.createBuku);
router.put('/:id', ctrl.updateBuku);
router.delete('/:id', ctrl.deleteBuku);

module.exports = router;