const express = require('express')
const router = express.Router()

const NhaTuyenDung = require('../controllers/NhaTuyenDung.controller')
const CongViecController = require('../controllers/CongViec.controller')

router.get('/:id', NhaTuyenDung.traVeNhaTuyenDung)
router.get('/', NhaTuyenDung.traVeTatCaNhaTuyenDung)
router.put('/', NhaTuyenDung.capNhatThongTinNhaTuyenDung)

router.post('/dang-tin', CongViecController.DangBaiTuyenDung)
router.get('/quan-ly-tin', CongViecController.traVeTatCaCongViec)
router.put('/:id', CongViecController.capNhatCongViec)
router.delete('/', CongViecController.xoaCongViec)

module.exports = router
