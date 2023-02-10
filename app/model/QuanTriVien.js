const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuanTriVienSchema = new Schema({
    hoVaTen: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    matKhau: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    roles: {
        type: Number,
        default: 1,
    },
    refreshToken: [String],
})

QuanTriVienSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = mongoose.model('QuanTriVien', QuanTriVienSchema)