const express = require('express');
const router = express.Router();

const KinhNghiemController = require('../../controllers/options/KinhNghiem.controller')

router.post('/', KinhNghiemController.ThemKinhNghiem)
router.put('/:id', KinhNghiemController.SuaKinhNghiem)
router.get('/', KinhNghiemController.getAllKinhNghiems)
router.delete('/:id', KinhNghiemController.XoaKinhNghiem)
module.exports = router