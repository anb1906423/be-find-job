const express = require('express');
const router = express.Router();

const LoaiHopDongController = require('../../controllers/options/LoaiHopDong.controller')

router.post('/', LoaiHopDongController.ThemLoaiHopDong)
router.put('/:id', LoaiHopDongController.SuaLoaiHopDong)
router.delete('/:id', LoaiHopDongController.XoaLoaiHopDong)
router.get('/', LoaiHopDongController.GetAllLoaiHopDong)

module.exports = router