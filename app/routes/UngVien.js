const express = require('express')
const router = express.Router()
const UngVien = require('../controllers/UngVien.controller')

router.post('/search', UngVien.timKiemUngVienQuaEmail)
router.get('/:id', UngVien.traVeUngVien)
router.get('/', UngVien.traVeTatCaUngVien)
router.put('/on', UngVien.onState)
router.put('/off', UngVien.offState)
router.put('/:id', UngVien.capNhatThongTinUngVien)
router.put('/doi-mat-khau/:id', UngVien.HamThayDoiMatKhau)

module.exports = router
