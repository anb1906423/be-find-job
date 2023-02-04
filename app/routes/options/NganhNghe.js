const express = require('express');
const router = express.Router()

const NganhNgheController = require('../../controllers/options/NganhNghe.controller')

router.post('/', NganhNgheController.ThemNganhNghe)
router.put('/:id', NganhNgheController.SuaNganhNghe)
router.delete('/:id', NganhNgheController.XoaNganhNghe)
router.get('/', NganhNgheController.GetAllNganhNghe)

module.exports = router