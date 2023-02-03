const LinhVucKinhDoanh = require('../../model/options/LinhVucKinhDoanh')

const ThemLinhVucKinhDoanh = async (req, res) => {
    const { ten } = req.body
    if (!ten) return res.status(400).json({
        message: 'Lĩnh vực kinh doanh không được để trống'
    })

    const foundLinhVucKinhDoanh = await LinhVucKinhDoanh.findOne({
        ten: ten
    }).exec()

    if (foundLinhVucKinhDoanh) return res.status(400).json({ message: 'Lĩnh vực kinh doanh đã tồn tại!' })

    const linhVucKinhDoanh = new LinhVucKinhDoanh({ ten })
    await linhVucKinhDoanh.save()
    res.status(201).json({ message: 'Thêm lĩnh vực kinh doanh thành công', data: linhVucKinhDoanh });
    return linhVucKinhDoanh
}

const SuaLinhVucKinhDoanh = async (req, res) => {
    const { id } = req.params;
    const { ten } = req.body;

    if (!ten) return res.status(400).json({
        message: 'Lĩnh vực kinh doanh không được để trống'
    }); // Name is required

    const foundLinhVucKinhDoanh = await LinhVucKinhDoanh.findOne({ ten: ten }).exec();

    if (foundLinhVucKinhDoanh) return res.status(400).json({ "message": "Lĩnh vực kinh doanh đã tồn tại" });
    const linhVucKinhDoanh = await LinhVucKinhDoanh.findByIdAndUpdate(id, { ten }, { new: true });
    if (!linhVucKinhDoanh) return res.status(404).json({ message: 'Không tìm thấy lĩnh vực kinh doanh' }); // Salary not found

    res.status(200).json({ message: 'Chỉnh sửa lĩnh vực kinh doanh thành công', data: linhVucKinhDoanh });
}

const XoaLinhVucKinhDoanh = async (req, res) => {
    const { id } = req.params;

    const linhVucKinhDoanh = await LinhVucKinhDoanh.findByIdAndRemove(id);
    if (!linhVucKinhDoanh) return res.status(404).json({ message: 'Không tìm thấy lĩnh vực kinh doanh' }); // Salary not found

    res.status(200).json({ message: 'Xóa lĩnh vực kinh doanh thành công' });
}

const getAllLinhVucKinhDoanh = async (req, res) => {
    try {
        const linhVucKinhDoanh = await LinhVucKinhDoanh.find({});
        res.status(200).send(linhVucKinhDoanh);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    ThemLinhVucKinhDoanh,
    SuaLinhVucKinhDoanh,
    XoaLinhVucKinhDoanh,
    getAllLinhVucKinhDoanh
}