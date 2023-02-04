const QuiMo = require('../../model/options/QuiMo')

const ThemQuiMo = async (req, res) => {
    const { ten } = req.body
    if (!ten) return res.status(400).json({
        message: 'Qui mô công ty không được để trống'
    })

    const foundQuiMo = await QuiMo.findOne({
        ten: ten
    }).exec()

    if (foundQuiMo) return res.status(400).json({ message: 'Qui mô công ty đã tồn tại!' })

    const quiMo = new QuiMo({ ten })
    await quiMo.save()
    res.status(201).json({ message: 'Thêm qui mô công ty thành công', data: quiMo });
    return quiMo
}

const SuaQuiMo = async (req, res) => {
    const { id } = req.params;
    const { ten } = req.body;

    if (!ten) return res.status(400).json({
        message: 'Qui mô công ty không được để trống'
    }); // Name is required

    const foundQuiMo = await QuiMo.findOne({ ten: ten }).exec();

    if (foundQuiMo && foundQuiMo._id != id) return res.status(400).json({ "message": "Qui mô công ty đã tồn tại" });
    const quiMo = await QuiMo.findByIdAndUpdate(id, { ten }, { new: true });
    if (!quiMo) return res.status(404).json({ message: 'Không tìm thấy qui mô công ty' }); // Salary not found

    res.status(200).json({ message: 'Chỉnh sửa qui mô công ty thành công', data: quiMo });
}

const XoaQuiMo = async (req, res) => {
    const { id } = req.params;

    const quiMo = await QuiMo.findByIdAndRemove(id);
    if (!quiMo) return res.status(404).json({ message: 'Không tìm thấy qui mô công ty' }); // Salary not found

    res.status(200).json({ message: 'Xóa qui mô công ty thành công' });
}

const GetAllQuiMo = async (req, res) => {
    try {
        const quiMos = await QuiMo.find({});
        res.status(200).send(quiMos);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    ThemQuiMo,
    SuaQuiMo,
    XoaQuiMo,
    GetAllQuiMo
}