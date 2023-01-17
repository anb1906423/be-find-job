const UngVien = require('../model/UngVien')
// const { BadRequestError } = require('../api-error')
// const handlePromise = require('../helpers/promise.helper')
// const mongoose = require('mongoose')

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

module.exports = { traVeUngVien, traVeTatCaUngVien };
