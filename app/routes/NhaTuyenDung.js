const express = require('express')
const router = express.Router()

const NhaTuyenDung = require('../controllers/NhaTuyenDung.controller')
const CongViecController = require('../controllers/CongViec.controller')

router.get('/', NhaTuyenDung.traVeTatCaNhaTuyenDung)
router.get('/:id', NhaTuyenDung.traVeNhaTuyenDung)
router.put('/doi-mat-khau/:id', NhaTuyenDung.HamThayDoiMatKhau)
router.put('/on', NhaTuyenDung.onState)
router.put('/off', NhaTuyenDung.offState)
router.put('/:id', NhaTuyenDung.capNhatThongTinNhaTuyenDung)

router.post('/dang-tin', CongViecController.DangBaiTuyenDung)
router.get('/quan-ly-tin', CongViecController.traVeTatCaCongViec)
router.put('/cong-viec/on', CongViecController.onState)
router.put('/cong-viec/off', CongViecController.offState)
router.put('/cap-nhat-tin/:id', CongViecController.capNhatCongViec)
router.delete('/', CongViecController.xoaCongViec)

module.exports = router
