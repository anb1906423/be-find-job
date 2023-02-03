const express = require('express')
const router = express.Router()

const LoaiHinhDoanhNGhiepController = require('../../controllers/options/LoaiHinhDoanhNghiep.controller')

router.post('/', LoaiHinhDoanhNGhiepController.ThemLoaiHinhDoanhNghiep)
router.put('/:id', LoaiHinhDoanhNGhiepController.SuaLoaiHinhDoanhNghiep)
router.delete('/:id', LoaiHinhDoanhNGhiepController.XoaLoaiHinhDoanhNghiep)
router.get('/', LoaiHinhDoanhNGhiepController.getAllLoaiHinhDoanhNghiep)

module.exports = router