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

const traVeNhaTuyenDungVoiEmail = async (req, res) => {
    if (!req?.headers?.email) return res.status(400).json({ "message": 'email nhà tuyển dụng không được để trống' });
    const nhaTuyenDung = await NhaTuyenDung.findOne({ email: req.headers.email }).exec();
    if (!nhaTuyenDung) {
        return res.status(204).json({ 'message': `User ID ${req.headers.email} not found` });
    }
    res.json(nhaTuyenDung);
}

const traVeTatCaNhaTuyenDung = async (req, res) => {
    const nhaTuyenDung = await NhaTuyenDung.find();
    if (!nhaTuyenDung) return res.status(204).json({ 'message': 'Không tìm thấy nhà tuyển dụng nào!' });
    res.json(nhaTuyenDung);
}

const timKiemNhaTuyenDungQuaEmail = async (req, res) => {
    const email = req.body.email;

    try {
        // Tìm kiếm ứng viên có email khớp với từ khóa tìm kiếm
        const result = await NhaTuyenDung.find({ email: { $regex: new RegExp(email, 'i') } });

        // Gửi kết quả trả về cho client
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};

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

    const { id, matKhauCu, matKhauMoi } = req.body
    if (!id || !matKhauCu || !matKhauMoi) return res.status(400).json({ 'message': 'id, mật khẩu cũ và mật khẩu mới không được để trống!' })
    if (req.body?.matKhauMoi.length < 8) {
        return res.send({ message: 'Mật khẩu mới phải có ít nhất 8 ký tự!', status: 400 });
    }

    const foundNhaTuyenDung = await NhaTuyenDung.findById(id).exec();
    if (!foundNhaTuyenDung) {
        return res.status(404).json({ 'message': 'Không tìm thấy người dùng với email này!' })
    }

    const isMatch = await bcrypt.compare(matKhauCu, foundNhaTuyenDung.matKhau);
    if (!isMatch) return res.status(401).json({ 'message': 'Mật khẩu cũ không chính xác!' });

    try {
        const hashedPwd = await bcrypt.hash(matKhauMoi, 8)
        const updatedNhaTuyenDung = await NhaTuyenDung.findByIdAndUpdate(id, { matKhau: hashedPwd }, { new: true })

        res.status(200).send({ message: 'Thay đổi mật khẩu thành công!' })
    } catch (err) {
        res.status(500).json({
            message:
                "Đã xảy ra lỗi khi thay đổi mật khẩu, vui lòng thử lại sau!",
                dataErr:`${err}`
        });
    }
}

const onState = async (req, res, next) => {
    const nha_tuyen_dung_id = req.body.nha_tuyen_dung_id;
    if (!nha_tuyen_dung_id) return res.status(400).send('Trường nha_tuyen_dung_id không tồn tại');

    try {
        // Update the matching document to set the `state` field to `true`
        const updatedNhaTuyenDung = await NhaTuyenDung.findByIdAndUpdate(
            nha_tuyen_dung_id,
            { state: true },
            { new: true } // Return the updated document
        );

        return res.send(updatedNhaTuyenDung);
    } catch (error) {
        res.status(500).json({ 'message': 'Đã xảy ra lỗi khi thay đổi trạng thái nhà tuyển dụng!' })
    }
}

const offState = async (req, res, next) => {
    const nha_tuyen_dung_id = req.body.nha_tuyen_dung_id;
    if (!nha_tuyen_dung_id) return res.status(400).send('Trường nha_tuyen_dung_id không tồn tại');

    try {
        // Update the matching document to set the `state` field to `true`
        const updatedNhaTuyenDung = await NhaTuyenDung.findByIdAndUpdate(
            nha_tuyen_dung_id,
            { state: false },
            { new: true } // Return the updated document
        );

        return res.send(updatedNhaTuyenDung);
    } catch (error) {
        res.status(500).json({ 'message': 'Đã xảy ra lỗi khi thay đổi trạng thái nhà tuyển dụng!' })
    }
}

module.exports = {
    traVeNhaTuyenDung,
    traVeTatCaNhaTuyenDung,
    traVeNhaTuyenDungVoiEmail,
    timKiemNhaTuyenDungQuaEmail,
    capNhatThongTinNhaTuyenDung,
    HamThayDoiMatKhau,
    onState,
    offState,
};
