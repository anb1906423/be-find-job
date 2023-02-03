const DiaDiemLamViec = require('../../model/options/DiaDiemLamViec')

const ThemDiaDiemLamViec = async (req, res) => {
    const { ten } = req.body
    if (!ten) return res.status(400).json({
        message: 'Địa điểm làm việc không được để trống'
    })

    const foundDiaDiemLamViec = await DiaDiemLamViec.findOne({
        ten: ten
    }).exec()

    if (foundDiaDiemLamViec) return res.status(400).json({
        message: 'Địa điểm làm việc đã tồn tại'
    })

    const diaDiemLamViec = new DiaDiemLamViec({ ten })
    await diaDiemLamViec.save()
    res.status(201).json({ message: 'Thêm địa điểm làm việc thành công', data: diaDiemLamViec });
    return diaDiemLamViec
}

const SuaDiaDiemLamViec = async (req, res) => {
    const { id } = req.params;
    const { ten } = req.body;

    if (!ten) return res.status(400).json({
        message: 'Địa điểm làm việc không được để trống'
    }); // Name is required

    const foundDiaDiemLamViec = await DiaDiemLamViec.findOne({ ten: ten }).exec()

    if (foundDiaDiemLamViec) return res.status(400).json({ "message": "Địa điểm làm việc đã tồn tại" });
    const diaDiemLamViec = await DiaDiemLamViec.findByIdAndUpdate(id, { ten }, { new: true });
    if (!diaDiemLamViec) return res.status(404).json({ message: 'Không tìm thấy địa điểm làm việc' }); // Salary not found

    res.status(200).json({ message: 'Chỉnh sửa địa điểm làm việc thành công', data: diaDiemLamViec });
}

const XoaDiaDiemLamViec = async (req, res) => {
    const { id } = req.params;

    const diaDiemLamViec = await DiaDiemLamViec.findByIdAndRemove(id);
    if (!diaDiemLamViec) return res.status(404).json({ message: 'Không tìm thấy địa điểm làm việc' }); // Salary not found

    res.status(200).json({ message: 'Xóa địa điểm làm việc thành công' });
}

const getAllDiaDiemLamViecs = async (req, res) => {
    try {
        const diaDiemLamviecs = await DiaDiemLamViec.find({});
        res.status(200).send(diaDiemLamviecs);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    ThemDiaDiemLamViec,
    SuaDiaDiemLamViec,
    XoaDiaDiemLamViec,
    getAllDiaDiemLamViecs,
}