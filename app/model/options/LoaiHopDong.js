const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LoaiHopDongSchema = new Schema({
    ten: {
        type: String,
        required: true
    },
})

LoaiHopDongSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = mongoose.model('LoaiHopDong', LoaiHopDongSchema)