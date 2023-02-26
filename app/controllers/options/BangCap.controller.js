const BangCap = require('../../model/options/BangCap')

const ThemBangCap = async (req, res) => {
    const { ten, donViDaoTao, xepLoai } = req.body
    if (!ten) return res.status(400).json({
        message: 'Bằng cấp không được để trống'
    })

    // const foundBangCap = await BangCap.findOne({
    //     ten: ten
    // }).exec()

    // if (foundBangCap) return res.status(400).json({ message: 'Bằng cấp đã tồn tại!' })

    const bangCap = new BangCap({ ten, donViDaoTao, xepLoai })
    await bangCap.save()
    res.status(201).json({ message: 'Thêm bằng cấp thành công', data: bangCap });
    return bangCap
}

// Updating an existing BangCap
const SuaBangCap = async (req, res) => {
    const { id } = req.params;
    const { ten, donViDaoTao, xepLoai } = req.body;

    if (!ten) return res.status(400).json({
        message: 'Bằng cấp không được để trống'
    }); // Name is required

    const foundBangCap = await BangCap.findOne({ ten: ten }).exec();

    if (foundBangCap && foundBangCap._id != id) return res.status(400).json({ "message": "Bằng cấp đã tồn tại" });
    const bangCap = await BangCap.findByIdAndUpdate(id, { ten, donViDaoTao, xepLoai }, { new: true });
    if (!bangCap) return res.status(404).json({ message: 'Không tìm thấy bằng cấp' }); // Salary not found

    res.status(200).json({ message: 'Chỉnh sửa bằng cấp thành công', data: bangCap });
}

// Deleting a BangCap
const XoaBangCap = async (req, res) => {
    const { id } = req.params;

    const bangCap = await BangCap.findByIdAndRemove(id);
    if (!bangCap) return res.status(404).json({ message: 'Không tìm thấy bằng cấp' }); // Salary not found

    res.status(200).json({ message: 'Xóa bằng cấp thành công' });
}

const getAllBangCaps = async (req, res) => {
    try {
        const bangCaps = await BangCap.find({});
        res.status(200).send(bangCaps);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    ThemBangCap,
    SuaBangCap,
    XoaBangCap,
    getAllBangCaps
}