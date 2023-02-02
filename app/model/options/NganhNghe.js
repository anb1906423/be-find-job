const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NganhNgheSchema = new Schema({
    ten: {
        type: String,
        required: true
    },
})

NganhNgheSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = mongoose.model('NganhNghe', NganhNgheSchema)