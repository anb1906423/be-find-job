const express = require('express')
const router = express.Router()
const DangKyUngVien = require('../controllers/DangKyUngVien.controller')

const { checkDuplicateUsernameOrEmail } = require('../middlewares/verify-register.middleware')

router.post('/', [checkDuplicateUsernameOrEmail], DangKyUngVien.HamXuLyDangKyUngVien)

module.exports = router
