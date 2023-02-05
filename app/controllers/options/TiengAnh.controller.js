const TiengAnh = require('../../model/options/TiengAnh')

const ThemTiengAnh = async (req, res) => {
    const { xepLoai } = req.body
    if (!xepLoai) return res.status(400).json({
        message: 'Trình độ tiếng Anh không được để trống'
    })

    const foundTiengAnh = await TiengAnh.findOne({
        xepLoai: xepLoai,
    }).exec()

    if (foundTiengAnh) return res.status(400).json({ message: 'Trình độ tiếng Anh đã tồn tại!' })

    const tiengAnh = new TiengAnh({ xepLoai })
    await tiengAnh.save()
    res.status(201).json({ message: 'Thêm trình độ tiếng Anh thành công', data: tiengAnh });
    return tiengAnh
}

const SuaTiengAnh = async (req, res) => {
    const { id } = req.params;
    const { xepLoai } = req.body;

    if (!xepLoai) return res.status(400).json({
        message: 'Trình độ tiếng Anh không được để trống'
    }); // Name is required

    const foundTiengAnh = await TiengAnh.findOne({ xepLoai: xepLoai }).exec();

    if (foundTiengAnh) return res.status(400).json({ "message": "Trình độ tiếng Anh đã tồn tại" });
    const tiengAnh = await TiengAnh.findByIdAndUpdate(id, { xepLoai }, { new: true });
    if (!tiengAnh) return res.status(404).json({ message: 'Không tìm thấy trình độ tiếng Anh' }); // Salary not found

    res.status(200).json({ message: 'Chỉnh sửa trình độ tiếng Anh thành công', data: tiengAnh });
}

const XoaTiengAnh = async (req, res) => {
    const { id } = req.params;

    const tiengAnh = await TiengAnh.findByIdAndRemove(id);
    if (!tiengAnh) return res.status(404).json({ message: 'Không tìm thấy trình độ tiếng Anh' }); // Salary not found

    res.status(200).json({ message: 'Xóa trình độ tiếng Anh thành công' });
}

const getAllTiengAnh = async (req, res) => {
    try {
        const tiengAnhs = await TiengAnh.find({});
        res.status(200).send(tiengAnhs);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    ThemTiengAnh,
    SuaTiengAnh,
    XoaTiengAnh,
    getAllTiengAnh,
}