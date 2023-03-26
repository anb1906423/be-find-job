const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NhaTuyenDungSchema = new Schema({
    logoCty: {
        type: String,
    },
    tenCty: {
        type: String,
        required: true
    },
    banner: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    matKhau: {
        type: String,
        required: true,
    },
    soDienThoai: {
        type: String,
        required: true
    },
    diaChi: {
        type: String,
        required: true
    },
    khuVuc: {
        type: String,
    },
    gioiThieu: {
        type: String
    },
    maSoThue: {
        type: String,
        required: true
    },
    quiMo: {
        type: String,
    },
    website: {
        type: String
    },
    linhVucNgheNghiep: {
        type: String
    },
    loaiHinhDoanhNghiep: {
        type: String
    },
    anhCongTy: {
        type: String
    },
    roles: {
        type: Number,
        default: 0,
    },
    state: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    refreshToken: [String],
})

NhaTuyenDungSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = mongoose.model('NhaTuyenDung', NhaTuyenDungSchema)