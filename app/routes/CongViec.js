const express = require('express')
const router = express.Router()

const CongViecController = require('../controllers/CongViec.controller')

router.get('/:id', CongViecController.traVeCongViec)
router.get('/', CongViecController.traVeTatCaCongViec)
router.post('/create', CongViecController.DangBaiTuyenDung)
router.put('/update/:id', CongViecController.capNhatCongViec)

router.delete('/delete', CongViecController.xoaCongViec)
router.put('/on', CongViecController.onState)
router.put('/off', CongViecController.offState)

module.exports = router