const express = require('express');
const router = express.Router();

const BangCapController = require('../../controllers/options/BangCap.controller')

router.post('/', BangCapController.ThemBangCap)
router.get('/', BangCapController.getAllBangCaps)
router.put('/:id', BangCapController.SuaBangCap)
router.delete('/:id', BangCapController.XoaBangCap)

module.exports = router