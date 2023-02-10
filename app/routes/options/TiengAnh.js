const express = require('express');
const router = express.Router()

const TiengAnhController = require('../../controllers/options/TiengAnh.controller')

router.post('/', TiengAnhController.ThemTiengAnh)
router.put('/:id', TiengAnhController.SuaTiengAnh)
// router.delete('/:id', TiengAnhController.XoaTiengAnh)
router.get('/', TiengAnhController.getAllTiengAnh) 

module.exports = router