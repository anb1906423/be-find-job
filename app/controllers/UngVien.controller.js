const UngVien = require('../model/UngVien')
const BadRequestError = require('../api-error')
const handlePromise = require('../helpers/promise.helper')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const traVeUngVien = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'id ứng viên không được để trống' });
    const ungVien = await UngVien.findOne({ _id: req.params.id }).exec();
    if (!ungVien) {
        return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
    }
    res.json(ungVien);
}

const traVeTatCaUngVien = async (req, res) => {
    const ungVien = await UngVien.find();
    if (!ungVien) return res.status(204).json({ 'message': 'Không tìm thấy ứng viên nào!' });
    res.json(ungVien);
}

const capNhatThongTinUngVien = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new BadRequestError(400,
            'Dữ liệu không được để trống!'))
    }

    const { id } = req.params

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return next(new BadRequestError(400,
    //         'Id không hợp lệ!'))
    // }

    const condition = {
        _id: id,
    }

    const [error, document] = await handlePromise(
        UngVien.findOneAndUpdate(condition, req.body, {
            new: true,
        })
    )

    if (error) {
        return next(new BadRequestError(500,
            `Đã xảy ra lỗi khi cập nhật thông tin ứng viên có id=${req.params.id}`
        ))
    }

    if (!document) {
        return next(new BadRequestError(404,
            'Không tìm thấy ứng viên!'
        ))
    }

    return res.send({ message: 'Cập nhật thông tin ứng viên thành công!', })
}

const HamThayDoiMatKhau = async (req, res) => {
    
    const { email, matKhauCu, matKhauMoi } = req.body
    if (!email || !matKhauCu || !matKhauMoi) return res.status(400).json({ 'message': 'Email, mật khẩu cũ và mật khẩu mới không được để trống!' })
    if (req.body?.matKhauMoi.length < 8) {
        return res.send({ message: 'Mật khẩu mới phải có ít nhất 8 ký tự!', status: 400 });
    }

    const foundUngVien = await UngVien.findOne({ email: email }).exec();
    if (!foundUngVien) {
        return res.status(404).json({ 'message': 'Không tìm thấy người dùng với email này!' })
    }

    const isMatch = await bcrypt.compare(matKhauCu, foundUngVien.matKhau);
    if (!isMatch) return res.status(401).json({ 'message': 'Mật khẩu cũ không chính xác!' });

    try {
        const hashedPwd = await bcrypt.hash(matKhauMoi, 8)
        const updatedUngVien = await UngVien.findOneAndUpdate({ email: email }, { matKhau: hashedPwd }, { new: true })

        res.status(200).send({ message: 'Thay đổi mật khẩu thành công!' })
    } catch (err) {
        res.status(500).json({ 'message': 'Đã xảy ra lỗi khi thay đổi mật khẩu, vui lòng thử lại sau!' })
    }
}

module.exports = {
    traVeUngVien,
    traVeTatCaUngVien,
    capNhatThongTinUngVien,
    HamThayDoiMatKhau
};
