const express = require('express')
const router = express.Router()
const DangKyNhaTuyenDung = require('../controllers/DangKyNhaTuyenDung.controller')
const { checkDuplicateUsernameOrEmail } = require('../middlewares/verify-register.middleware')

router.post('/', [checkDuplicateUsernameOrEmail], DangKyNhaTuyenDung.HamXuLyDangKyNhaTuyenDung)

module.exports = router