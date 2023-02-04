const express = require('express');
const router = express.Router()

const QuiMoController = require('../../controllers/options/QuiMo.controller')

router.post('/', QuiMoController.ThemQuiMo)
router.put('/:id', QuiMoController.SuaQuiMo)
router.delete('/:id', QuiMoController.XoaQuiMo)
router.get('/', QuiMoController.GetAllQuiMo)

module.exports = router