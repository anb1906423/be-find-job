const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UngVienSchema = new Schema({
    hoVaTen: {
        type: String,
        required: false,
    },
    avatar: {
        type: String,
    },
    sinhNhat: {
        type: Date,
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
    },
    diaChi: {
        type: String,
    },
    // có phải giới tính nam hay k?
    isMale: {
        type: Boolean,
    },
    docThan: {
        type: Boolean,
    },
    viTriMongMuon: {
        type: String
    },
    capBac: {
        type: String
    },
    mucLuongMongMuon: {
        type: String
    },
    kinhNghiem: {
        type: String
    },
    hocVan: {
        type: String
    },
    gioiThieu: {
        type: String
    },
    mucTieuNgheNghiep: {
        type: String
    },
    linhVucNgheNghiep: {
        type: [String]
    },
    diaDiemMongMuonLamViec: {
        type: [String]
    },
    state: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    roles: {
        type: Number,
        default: -1,
    },
    refreshToken: [String],
})

UngVienSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = mongoose.model('UngVien', UngVienSchema)