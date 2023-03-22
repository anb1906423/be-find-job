const express = require('express')
const router = express.Router()
const verifyJWT = require('../../middlewares/verifyJWT')

const MucLuongController = require('../../controllers/options/MucLuong.controller')

router.post('/', MucLuongController.ThemMucLuong)
router.get('/', MucLuongController.getAllMucLuongs)
router.put('/:id', MucLuongController.SuaMucLuong)
router.delete('/:id', MucLuongController.XoaMucLuong)

module.exports = router