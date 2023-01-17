const NhaTuyenDung = require('../model/NhaTuyenDung')
// const { BadRequestError } = require('../api-error')
// const handlePromise = require('../helpers/promise.helper')
// const mongoose = require('mongoose')

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

module.exports = { traVeNhaTuyenDung, traVeTatCaNhaTuyenDung };
