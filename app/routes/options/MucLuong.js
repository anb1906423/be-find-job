const express = require('express')
const router = express.Router()
const verifyJWT = require('../../middlewares/verifyJWT')

const MucLuongController = require('../../controllers/options/MucLuong.controller')

router.post('/', [verifyJWT], MucLuongController.ThemMucLuong)
router.get('/', [verifyJWT], MucLuongController.getAllMucLuongs)
router.put('/:id', [verifyJWT], MucLuongController.SuaMucLuong)
router.delete('/:id', [verifyJWT], MucLuongController.XoaMucLuong)

module.exports = router