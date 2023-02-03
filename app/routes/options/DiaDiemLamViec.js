const express = require('express');
const router = express.Router()

const DiaDiemLamViecController = require('../../controllers/options/DiaDiemLamViec.controller')

router.post('/', DiaDiemLamViecController.ThemDiaDiemLamViec)
router.delete('/:id', DiaDiemLamViecController.XoaDiaDiemLamViec)
router.get('/', DiaDiemLamViecController.getAllDiaDiemLamViecs)
router.put('/:id', DiaDiemLamViecController.SuaDiaDiemLamViec)

module.exports = router
