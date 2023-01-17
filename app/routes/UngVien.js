const express = require('express')
const router = express.Router()
const UngVien = require('../controllers/UngVien.controller')

router.get('/:id', UngVien.traVeUngVien)
router.get('/', UngVien.traVeTatCaUngVien)

module.exports = router
