const LoaiHopDong = require('../../model/options/LoaiHopDong')

const ThemLoaiHopDong = async (req, res) => {
    const { ten } = req.body
    if (!ten) return res.status(400).json({
        message: 'Loại hợp đồng không được để trống'
    })

    const foundLoaiHopDong = await LoaiHopDong.findOne({
        ten: ten
    }).exec()

    if (foundLoaiHopDong) return res.status(400).json({ message: 'Loại hợp đồng đã tồn tại!' })

    const loaiHopDong = new LoaiHopDong({ ten })
    await loaiHopDong.save()
    res.status(201).json({ message: 'Thêm bằng cấp thành công', data: loaiHopDong });
    return loaiHopDong
}

const SuaLoaiHopDong = async (req, res) => {
    const { id } = req.params;
    const { ten } = req.body;

    if (!ten) return res.status(400).json({
        message: 'Loại hợp đồng không được để trống'
    }); // Name is required

    const foundLoaiHopDong = await LoaiHopDong.findOne({ ten: ten }).exec();

    if (foundLoaiHopDong) return res.status(400).json({ "message": "Loại hợp đồng đã tồn tại" });
    const loaiHopDong = await LoaiHopDong.findByIdAndUpdate(id, { ten }, { new: true });
    if (!loaiHopDong) return res.status(404).json({ message: 'Không tìm thấy loại hợp đồng' }); // Salary not found

    res.status(200).json({ message: 'Chỉnh sửa loại hợp đồng thành công', data: loaiHopDong });
}

const XoaLoaiHopDong = async (req, res) => {
    const { id } = req.params;

    const loaiHopDong = await LoaiHopDong.findByIdAndRemove(id);
    if (!loaiHopDong) return res.status(404).json({ message: 'Không tìm thấy loại hợp đồng' }); // Salary not found

    res.status(200).json({ message: 'Xóa loại hợp đồng thành công' });
}

const GetAllLoaiHopDong = async (req, res) => {
    try {
        const loaiHopDongs = await LoaiHopDong.find({});
        res.status(200).send(loaiHopDongs);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    ThemLoaiHopDong,
    SuaLoaiHopDong,
    XoaLoaiHopDong,
    GetAllLoaiHopDong
}