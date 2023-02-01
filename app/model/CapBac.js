const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CapBacSchema = new Schema({
    ten: {
        type: String,
        required: true
    },
})

CapBacSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = mongoose.model('CapBac', CapBacSchema)