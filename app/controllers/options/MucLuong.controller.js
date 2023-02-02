const MucLuong = require('../../model/options/MucLuong')

const ThemMucLuong = async (req, res) => {
    const { ten } = req.body;
    if (!ten) return res.status(400).json({
        message: 'Tên mức lương là bắt buộc'
    }); // Name is required

    const foundMucLuong = await MucLuong.findOne({
        ten: ten
    }).exec();

    if (foundMucLuong && foundMucLuong._id != id) return res.status(400).json({ "message": "Mức lương đã tồn tại" });

    const mucLuong = new MucLuong({ ten });
    await mucLuong.save();
    res.status(201).json({ message: 'Thêm mức lương thành công', data: mucLuong });
}

const SuaMucLuong = async (req, res) => {
    const { id } = req.params;
    const { ten } = req.body;

    if (!ten) return res.status(400).json({
        message: 'Tên mức lương là bắt buộc'
    }); // Name is required
    const foundMucLuong = await MucLuong.findOne({ ten: ten }).exec();

    if (foundMucLuong && foundMucLuong._id != id) return res.status(400).json({ "message": "Mức lương đã tồn tại" });
    const mucLuong = await MucLuong.findByIdAndUpdate(id, { ten }, { new: true });
    if (!mucLuong) return res.status(404).json({ message: 'Không tìm thấy mức lương' }); // Salary not found

    res.status(200).json({ message: 'Sửa mức lương thành công', data: mucLuong });
}

const XoaMucLuong = async (req, res) => {
    const { id } = req.params;

    const mucLuong = await MucLuong.findByIdAndRemove(id);
    if (!mucLuong) return res.status(404).json({ message: 'Không tìm thấy mức lương' }); // Salary not found

    res.status(200).json({ message: 'Xóa mức lương thành công' });
}

module.exports = {
    ThemMucLuong,
    SuaMucLuong,
    XoaMucLuong, 
}
