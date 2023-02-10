const express = require('express');
const router = express.Router()

const QuanTriVienController = require('../controllers/QuanTriVien.controller')

router.post('/dang-ky', QuanTriVienController.XuLyDangKyQuanTriVien)
router.post('/dang-nhap', QuanTriVienController.DangNhapQuanTriVien)
router.get('/', QuanTriVienController.traVeTatCaQuanTriVien)
router.delete('/:id', QuanTriVienController.xoaQuanTriVien)

module.exports = router