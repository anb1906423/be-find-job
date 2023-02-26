const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BangCapSchema = new Schema({
    ten: {
        type: String,
        required: false
    },
    donViDaoTao: {
        type: String,
    },
    xepLoai: {
        type: String,
    }
})

BangCapSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = mongoose.model('BangCap', BangCapSchema)