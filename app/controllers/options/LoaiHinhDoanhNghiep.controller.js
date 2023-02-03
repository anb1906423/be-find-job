const LoaiHinhDoanhNghiep = require('../../model/options/LoaiHinhDoanhNghiep')

const ThemLoaiHinhDoanhNghiep = async (req, res) => {
    const { ten } = req.body
    if (!ten) return res.status(400).json({
        message: 'Loại hình doanh nghiệp không được để trống'
    })

    const foundLoaiHinhDoanhNghiep = await LoaiHinhDoanhNghiep.findOne({
        ten: ten
    }).exec()

    if (foundLoaiHinhDoanhNghiep) return res.status(400).json({ message: 'Loại hình doanh nghiệp đã tồn tại!' })

    const loaiHinhDoanhNghiep = new LoaiHinhDoanhNghiep({ ten })
    await loaiHinhDoanhNghiep.save()
    res.status(201).json({ message: 'Thêm loại hình doanh nghiệp thành công', data: loaiHinhDoanhNghiep });
    return loaiHinhDoanhNghiep
}

const SuaLoaiHinhDoanhNghiep = async (req, res) => {
    const { id } = req.params;
    const { ten } = req.body;

    if (!ten) return res.status(400).json({
        message: 'Loại hình doanh nghiệp không được để trống'
    }); // Name is required

    const foundLoaiHinhDoanhNghiep = await LoaiHinhDoanhNghiep.findOne({ ten: ten }).exec();

    if (foundLoaiHinhDoanhNghiep) return res.status(400).json({ "message": "Loại hình doanh nghiệp đã tồn tại" });
    const loaiHinhDoanhNghiep = await LoaiHinhDoanhNghiep.findByIdAndUpdate(id, { ten }, { new: true });
    if (!loaiHinhDoanhNghiep) return res.status(404).json({ message: 'Không tìm thấy loại hình doanh nghiệp' }); // Salary not found

    res.status(200).json({ message: 'Chỉnh sửa bằng cấp thành công', data: loaiHinhDoanhNghiep });
}

const XoaLoaiHinhDoanhNghiep = async (req, res) => {
    const { id } = req.params;

    const loaiHinhDoanhNghiep = await LoaiHinhDoanhNghiep.findByIdAndRemove(id);
    if (!loaiHinhDoanhNghiep) return res.status(404).json({ message: 'Không tìm thấy loại hình doanh nghiệp' }); // Salary not found

    res.status(200).json({ message: 'Xóa loại hình doanh nghiệp thành công' });
}

const getAllLoaiHinhDoanhNghiep = async (req, res) => {
    try {
        const loaiHinhDoanhNghieps = await LoaiHinhDoanhNghiep.find({});
        res.status(200).send(loaiHinhDoanhNghieps);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    ThemLoaiHinhDoanhNghiep,
    SuaLoaiHinhDoanhNghiep,
    XoaLoaiHinhDoanhNghiep,
    getAllLoaiHinhDoanhNghiep
}