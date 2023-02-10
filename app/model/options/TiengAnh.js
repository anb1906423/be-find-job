const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TiengAnhSchema = new Schema({
    xepLoai: {
        type: String,
        require: true
    },
    idUngVien: {
        type: String,
    }
})

TiengAnhSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = mongoose.model('TrinhDoTiengAnh', TiengAnhSchema)