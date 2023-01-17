const express = require('express')
const router = express.Router()
const NhaTuyenDung = require('../controllers/NhaTuyenDung.controller')

router.get('/:id', NhaTuyenDung.traVeNhaTuyenDung)
router.get('/', NhaTuyenDung.traVeTatCaNhaTuyenDung)

module.exports = router
