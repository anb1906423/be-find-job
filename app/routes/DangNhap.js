const express = require('express')
const router = express.Router()
const DangNhapUngVien = require('../controllers/DangNhapUngVien.controller')
const DangNhapNhaTuyenDung = require('../controllers/DangNhapNhaTuyenDung.controller')


router.post('/ung-vien', DangNhapUngVien.DangNhapUngVien)
router.post('/nha-tuyen-dung', DangNhapNhaTuyenDung.DangNhapNhaTuyenDung)

module.exports = router
