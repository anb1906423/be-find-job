const express = require('express')
const router = express.Router()

const CongViecController = require('../controllers/CongViec.controller')

router.get('/:id', CongViecController.traVeCongViec)

module.exports = router