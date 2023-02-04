const NganhNghe = require('../../model/options/NganhNghe')

const ThemNganhNghe = async (req, res) => {
    const { ten } = req.body
    if (!ten) return res.status(400).json({
        message: 'Ngành nghề không được để trống'
    })

    const foundNganhNghe = await NganhNghe.findOne({
        ten: ten
    }).exec()

    if (foundNganhNghe) return res.status(400).json({ message: 'Ngành nghề đã tồn tại!' })

    const nganhNghe = new NganhNghe({ ten })
    await nganhNghe.save()
    res.status(201).json({ message: 'Thêm ngành nghề thành công', data: nganhNghe });
    return nganhNghe
}

const SuaNganhNghe = async (req, res) => {
    const { id } = req.params;
    const { ten } = req.body;

    if (!ten) return res.status(400).json({
        message: 'Ngành nghề không được để trống'
    }); // Name is required

    const foundNganhNghe = await NganhNghe.findOne({ ten: ten }).exec();

    if (foundNganhNghe) return res.status(400).json({ "message": "Ngành nghề đã tồn tại" });
    const nganhNghe = await NganhNghe.findByIdAndUpdate(id, { ten }, { new: true });
    if (!nganhNghe) return res.status(404).json({ message: 'Không tìm thấy ngành nghề' }); // Salary not found

    res.status(200).json({ message: 'Chỉnh sửa ngành nghề thành công', data: nganhNghe });
}

const XoaNganhNghe = async (req, res) => {
    const { id } = req.params;

    const nganhNghe = await NganhNghe.findByIdAndRemove(id);
    if (!nganhNghe) return res.status(404).json({ message: 'Không tìm thấy ngành nghề' }); // Salary not found

    res.status(200).json({ message: 'Xóa ngành nghề thành công' });
}

const GetAllNganhNghe = async (req, res) => {
    try {
        const nganhNghes = await NganhNghe.find({});
        res.status(200).send(nganhNghes);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    ThemNganhNghe,
    SuaNganhNghe,
    XoaNganhNghe,
    GetAllNganhNghe
}