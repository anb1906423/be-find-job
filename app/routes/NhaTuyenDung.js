const express = require('express')
const router = express.Router()

const NhaTuyenDung = require('../controllers/NhaTuyenDung.controller')
const CongViecController = require('../controllers/CongViec.controller')

router.get('/:id', NhaTuyenDung.traVeNhaTuyenDung)
router.get('/', NhaTuyenDung.traVeTatCaNhaTuyenDung)
router.put('/:id', NhaTuyenDung.capNhatThongTinNhaTuyenDung)
router.put('/doi-mat-khau/:id', NhaTuyenDung.HamThayDoiMatKhau)

router.post('/dang-tin', CongViecController.DangBaiTuyenDung)
router.get('/quan-ly-tin', CongViecController.traVeTatCaCongViec)
router.put('/cap-nhat-tin/:id', CongViecController.capNhatCongViec)
router.delete('/', CongViecController.xoaCongViec)

module.exports = router
