const CapBac = require('../../model/options/CapBac')

const ThemCapBac = async (req, res) => {
    const { ten } = req.body
    if (!ten) return res.status(400).json({
        message: 'Cấp bậc không được để trống'
    })

    const foundCapBac = await CapBac.findOne({
        ten: ten
    }).exec()

    if (foundCapBac) return res.status(400).json({ message: 'Cấp bậc đã tồn tại!' })

    const capBac = new CapBac({ ten })
    await capBac.save()
    res.status(201).json({ message: 'Thêm cấp bậc thành công', data: capBac });
    return capBac
}

const SuaCapBac = async (req, res) => {
    const { id } = req.params;
    const { ten } = req.body;

    if (!ten) return res.status(400).json({
        message: 'Cấp bậc không được để trống'
    }); // Name is required

    const foundCapBac = await CapBac.findOne({ ten: ten }).exec();

    if (foundCapBac && foundCapBac._id != id) return res.status(400).json({ "message": "Cấp bậc đã tồn tại" });
    const capBac = await CapBac.findByIdAndUpdate(id, { ten }, { new: true });
    if (!capBac) return res.status(404).json({ message: 'Không tìm thấy cấp bậc' }); // Salary not found

    res.status(200).json({ message: 'Chỉnh sửa cấp bậc thành công', data: capBac });
}

const XoaCapBac = async (req, res) => {
    const { id } = req.params;

    const capBac = await CapBac.findByIdAndRemove(id);
    if (!capBac) return res.status(404).json({ message: 'Không tìm thấy cấp bậc' }); // Salary not found

    res.status(200).json({ message: 'Xóa cấp bậc thành công' });
}

const GetAllCapBac = async (req, res) => {
    try {
        const capBacs = await CapBac.find({});
        res.status(200).send(capBacs);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    ThemCapBac,
    SuaCapBac,
    XoaCapBac,
    GetAllCapBac
}