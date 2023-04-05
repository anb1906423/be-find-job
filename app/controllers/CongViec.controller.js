const CongViec = require('../model/CongViec')
const BadRequestError = require('../api-error')
const handlePromise = require('../helpers/promise.helper')
const mongoose = require('mongoose')

const DangBaiTuyenDung = async (req, res) => {
    const {
        chucDanh, capBac, loaiHopDong, mucLuong,
        diaDiemLamViec, linhVucNgheNghiep, hanNopHoSo,
        soLuong, moTa, yeuCauTuyenDung, emailNopHoSo,
        diaChiNopTrucTiep, yeuCauHoSo,
        // required: false
        kinhNghiem, bangCap, yeuCauGioiTinh,
        cheDoPhucLoi, hotline, state,
        contentMarkDown, contentHTML,
        emailCty
    } = req.body
    if (!chucDanh || !capBac || !loaiHopDong || !mucLuong ||
        !diaDiemLamViec || !linhVucNgheNghiep || !hanNopHoSo ||
        !soLuong || !moTa || !yeuCauTuyenDung || !emailNopHoSo ||
        !diaChiNopTrucTiep || !yeuCauHoSo || !emailCty) {
        return res.status(400).json({ 'message': 'Required!' })
    }
    try {
        const result = await CongViec.create({
            "chucDanh": chucDanh,
            "capBac": capBac,
            "loaiHopDong": loaiHopDong,
            "mucLuong": mucLuong,
            "diaDiemLamViec": diaDiemLamViec,
            "linhVucNgheNghiep": linhVucNgheNghiep,
            "hanNopHoSo": hanNopHoSo,
            "soLuong": soLuong,
            "moTa": moTa,
            "yeuCauTuyenDung": yeuCauTuyenDung,
            "emailNopHoSo": emailNopHoSo,
            "diaChiNopTrucTiep": diaChiNopTrucTiep,
            "kinhNghiem": kinhNghiem,
            "bangCap": bangCap,
            "yeuCauGioiTinh": yeuCauGioiTinh,
            "cheDoPhucLoi": cheDoPhucLoi,
            "yeuCauHoSo": yeuCauHoSo,
            "hotline": hotline,
            "state": state,
            "contentMarkDown": contentMarkDown,
            "contentHTML": contentHTML,
            "emailCty": emailCty
        })
        console.log(result);
        res.status(201).send({ message: `Đăng tuyển thành công ${chucDanh}!` })
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
}

const traVeCongViec = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'id công việc không được để trống' });
    const congViec = await CongViec.findOne({ _id: req.params.id }).exec();
    if (!congViec) {
        return res.status(204).json({ 'message': `Job ID ${req.params.id} not found` });
    }

    res.json(congViec);
}

const traVeTatCaCongViecCuaNhaTuyenDung = async (req, res) => {
    try {
        const { emailCty } = req.body;

        const congViec = await CongViec.find({ emailCty });

        if (!congViec) {
            return res.status(204).json({ 'message': 'Không tìm thấy công việc nào!' });
        }

        res.json(congViec);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 'message': 'Đã xảy ra lỗi!' });
    }
}

const traVeTatCaCongViec = async (req, res) => {
    const congViec = await CongViec.find();
    if (!congViec) return res.status(204).json({ 'message': 'Không tìm thấy công việc nào!' });
    res.json(congViec);
}

const capNhatCongViec = async (req, res, next) => {
    // if (Object.keys(req.body).length === 0) {
    //     return next(new BadRequestError(400,
    //         'Dữ liệu không được để trống!'))
    // }

    const { id } = req.params
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    }

    const [error, document] = await handlePromise(
        CongViec.findOneAndUpdate(condition, req.body, {
            new: true,
        })
    )

    if (error) {
        return next(new BadRequestError(500,
            `Đã xảy ra lỗi khi cập nhật công viêc có id=${req.params.id}`))
    }

    if (!document) {
        return next(new BadRequestError(404,
            'Không tìm thấy công việc!'))
    }

    return res.send({ message: 'Cập nhật công việc thành công!', })
}

const xoaCongViec = async (req, res) => {
    if (req?.body?.isDeleteAll == true) {
        const [error, data] = await handlePromise(
            CongViec.deleteMany({})
        )
        if (error) {
            return next(new BadRequestError(500,
                'Đã xảy ra lỗi khi xóa tất cả bài đăng!'))
        }

        return res.send({
            message: `Đã xóa thành công tất cả(${data.deletedCount}) bài đăng!`,
        })
    }
    if (!req?.body?.id) return res.status(400).json({ "message": 'id bài đăng không được để trống!' });
    const congViec = await CongViec.findOne({ _id: req.body.id }).exec();
    if (!congViec) {
        return res.status(400).json({ 'message': `congViec ID ${req.body.id} not found` });
    }
    const result = await congViec.deleteOne({ _id: req.body.id });
    res.json(result);
}

const onState = async (req, res, next) => {
    const cong_viec_id = req.body.cong_viec_id;
    if (!cong_viec_id) return res.status(400).send('Trường cong_viec_id không tồn tại');

    try {
        // Update the matching document to set the `state` field to `true`
        const updatedCongViec = await CongViec.findByIdAndUpdate(
            cong_viec_id,
            { state: true },
            { new: true } // Return the updated document
        );

        return res.send(updatedCongViec);
    } catch (error) {
        res.status(500).json({ 'message': 'Đã xảy ra lỗi khi thay đổi trạng thái công việc!' })
    }
}

const offState = async (req, res, next) => {
    const cong_viec_id = req.body.cong_viec_id;
    if (!cong_viec_id) return res.status(400).send('Trường cong_viec_id không tồn tại');

    try {
        // Update the matching document to set the `state` field to `true`
        const updatedCongViec = await CongViec.findByIdAndUpdate(
            cong_viec_id,
            { state: false },
            { new: true } // Return the updated document
        );

        return res.send(updatedCongViec);
    } catch (error) {
        res.status(500).json({ 'message': 'Đã xảy ra lỗi khi thay đổi trạng thái công việc!' })
    }
}

module.exports = {
    DangBaiTuyenDung,
    traVeTatCaCongViec,
    traVeCongViec,
    xoaCongViec,
    capNhatCongViec,
    traVeTatCaCongViecCuaNhaTuyenDung,
    onState,
    offState
}