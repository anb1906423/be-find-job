const express = require('express');
const router = express.Router();

const LinhVucKinhDoanhController = require('../../controllers/options/LinhVucKinhDoanh.controller')

router.post('/', LinhVucKinhDoanhController.ThemLinhVucKinhDoanh)
router.put('/:id', LinhVucKinhDoanhController.SuaLinhVucKinhDoanh)
router.delete('/:id', LinhVucKinhDoanhController.XoaLinhVucKinhDoanh)
router.get('/', LinhVucKinhDoanhController.getAllLinhVucKinhDoanh)

module.exports = router