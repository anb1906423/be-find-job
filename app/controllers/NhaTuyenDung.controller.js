const NhaTuyenDung = require('../model/NhaTuyenDung')
const { BadRequestError } = require('../api-error')
const handlePromise = require('../helpers/promise.helper')
const mongoose = require('mongoose')

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
    // if (Object.keys(req.body).length === 0) {
    //     return next(new BadRequestError(400,
    //         'Dữ liệu không được để trống!'))
    // }

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
        return next(new NotFoundError(404,
            'Không tìm thấy nhà tuyển dụng!'))
    }

    return res.send({ message: 'Cập nhật thông tin nhà tuyển dụng thành công!', })
}

module.exports = {
    traVeNhaTuyenDung,
    traVeTatCaNhaTuyenDung,
    capNhatThongTinNhaTuyenDung,
};
