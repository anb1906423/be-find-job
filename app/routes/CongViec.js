const express = require('express')
const router = express.Router()

const CongViecController = require('../controllers/CongViec.controller')

router.get('/:id', CongViecController.traVeCongViec)
router.get('/', CongViecController.traVeTatCaCongViec)

module.exports = router