const NhaTuyenDung = require('../model/NhaTuyenDung')
const BadRequestError = require('../api-error')
const handlePromise = require('../helpers/promise.helper')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const traVeNhaTuyenDung = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'id nhà tuyển dụng không được để trống' });
    const nhaTuyenDung = await NhaTuyenDung.findOne({ _id: req.params.id }).exec();
    if (!nhaTuyenDung) {
        return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
    }
    res.json(nhaTuyenDung);
}

const traVeTatCaNhaTuyenDung = async (req, res) => {
    const nhaTuyenDung = await NhaTuyenDung.find();
    if (!nhaTuyenDung) return res.status(204).json({ 'message': 'Không tìm thấy nhà tuyển dụng nào!' });
    res.json(nhaTuyenDung);
}

const capNhatThongTinNhaTuyenDung = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new BadRequestError(400,
            'Dữ liệu không được để trống!'))
    }

    const { id } = req.params
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    }

    const [error, document] = await handlePromise(
        NhaTuyenDung.findOneAndUpdate(condition, req.body, {
            new: true,
        })
    )

    if (error) {
        return next(new BadRequestError(500,
            `Đã xảy ra lỗi khi cập nhật thông tin nhà tuyển dụng có id=${req.params.id}`))
    }

    if (!document) {
        return next(new BadRequestError(404,
            'Không tìm thấy nhà tuyển dụng!'))
    }

    return res.send({ message: 'Cập nhật thông tin nhà tuyển dụng thành công!', })
}

const HamThayDoiMatKhau = async (req, res) => {

    const { email, matKhauCu, matKhauMoi } = req.body
    if (!email || !matKhauCu || !matKhauMoi) return res.status(400).json({ 'message': 'Email, mật khẩu cũ và mật khẩu mới không được để trống!' })
    if (req.body?.matKhauMoi.length < 8) {
        return res.send({ message: 'Mật khẩu mới phải có ít nhất 8 ký tự!', status: 400 });
    }

    const foundNhaTuyenDung = await NhaTuyenDung.findOne({ email: email }).exec();
    if (!foundNhaTuyenDung) {
        return res.status(404).json({ 'message': 'Không tìm thấy người dùng với email này!' })
    }

    const isMatch = await bcrypt.compare(matKhauCu, foundNhaTuyenDung.matKhau);
    if (!isMatch) return res.status(401).json({ 'message': 'Mật khẩu cũ không chính xác!' });

    try {
        const hashedPwd = await bcrypt.hash(matKhauMoi, 8)
        const updatedNhaTuyenDung = await NhaTuyenDung.findOneAndUpdate({ email: email }, { matKhau: hashedPwd }, { new: true })

        res.status(200).send({ message: 'Thay đổi mật khẩu thành công!' })
    } catch (err) {
        res.status(500).json({ 'message': 'Đã xảy ra lỗi khi thay đổi mật khẩu, vui lòng thử lại sau!' })
    }
}

module.exports = {
    traVeNhaTuyenDung,
    traVeTatCaNhaTuyenDung,
    capNhatThongTinNhaTuyenDung,
    HamThayDoiMatKhau,
};
