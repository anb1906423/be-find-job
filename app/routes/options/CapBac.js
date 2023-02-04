const express = require('express');
const router = express.Router()

const CapBacController = require('../../controllers/options/CapBac.controller')

router.post('/', CapBacController.ThemCapBac)
router.put('/:id', CapBacController.SuaCapBac)
router.delete('/:id', CapBacController.XoaCapBac)
router.get('/', CapBacController.GetAllCapBac)

module.exports = router