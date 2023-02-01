const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LoaiHinhDoanhNghiepSchema = new Schema({
    ten: {
        type: String,
        required: true
    },
})

LoaiHinhDoanhNghiepSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = mongoose.model('LoaiHinhDoanhNghiep', LoaiHinhDoanhNghiepSchema)