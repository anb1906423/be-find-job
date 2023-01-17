const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CongViecSchema = new Schema({
    chucDanh: {
        type: String,
        required: true,
    },
    capBac: {
        type: String,
        required: true,
    },
    loaiHopDong: {
        type: String,
        required: true,
    },
    mucLuong: {
        type: String,
        required: true,
    },
    diaDiemLamViec: {
        type: String,
        required: true,
    },
    linhVucNgheNghiep: {
        type: String,
        required: true,
    },
    hanNopHoSo: {
        type: Date,
        required: true,
    },
    soLuong: {
        type: Number,
        required: true,
    },
    moTa: {
        type: String,
        required: true,
    },
    // Yêu cầu công việc
    kinhNghiem: {
        type: String
    },
    bangCap: {
        type: String,
    },
    yeuCauGioiTinh: {
        type: String,
    },
    yeuCauTuyenDung: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    // Chế độ phúc lợi
    cheDoPhucLoi: {
        type: String,
    },
    yeuCauHoSo: {
        type: String,
    },
    // Cách nộp hồ sơ
    emailNopHoSo: {
        type: String,
    },
    hotline: {
        type: String,
    },
    diaChiNopTrucTiep: {
        type: String,
    },
})

CongViecSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = mongoose.model('CongViec', CongViecSchema)