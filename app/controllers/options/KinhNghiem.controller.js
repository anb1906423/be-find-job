const KinhNghiem = require('../../model/options/KinhNghiem')

const ThemKinhNghiem = async (req, res) => {
    const { ten, moTa } = req.body
    if (!ten) return res.status(400).json({
        message: 'Kinh nghiệm làm việc không được để trống'
    })

    const foundKinhNghiem = await KinhNghiem.findOne({
        ten: ten,
    }).exec()

    if (foundKinhNghiem) return res.status(400).json({ message: 'Kinh nghiệm làm việc đã tồn tại!' })

    const kinhNghiemLamviec = new KinhNghiem({ ten, moTa })
    await kinhNghiemLamviec.save()
    res.status(201).json({ message: 'Thêm kinh nghiệm làm việc thành công', data: kinhNghiemLamviec });
    return kinhNghiemLamviec
}

const SuaKinhNghiem = async (req, res) => {
    const { id } = req.params;
    const { ten, moTa } = req.body;

    if (!ten) return res.status(400).json({
        message: 'Kinh nghiệm làm việc không được để trống'
    }); // Name is required

    const foundKinhNghiem = await KinhNghiem.findOne({ ten: ten }).exec();

    if (foundKinhNghiem) return res.status(400).json({ "message": "Kinh nghiệm làm việc đã tồn tại" });
    const kinhNghiem = await KinhNghiem.findByIdAndUpdate(id, { ten, moTa }, { new: true });
    if (!kinhNghiem) return res.status(404).json({ message: 'Không tìm thấy kinh nghiệm làm việc' }); // Salary not found

    res.status(200).json({ message: 'Chỉnh sửa kinh nghiệm làm việc thành công', data: kinhNghiem });
}

const XoaKinhNghiem = async (req, res) => {
    const { id } = req.params;

    const kinhNghiem = await KinhNghiem.findByIdAndRemove(id);
    if (!kinhNghiem) return res.status(404).json({ message: 'Không tìm thấy kinh nghiệm làm việc' }); // Salary not found

    res.status(200).json({ message: 'Xóa kinh nghiệm làm việc thành công' });
}

const getAllKinhNghiems = async (req, res) => {
    try {
        const kinhNghiems = await KinhNghiem.find({});
        res.status(200).send(kinhNghiems);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    ThemKinhNghiem,
    SuaKinhNghiem,
    XoaKinhNghiem,
    getAllKinhNghiems,
}