const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const ungTuyen = new Schema({
    idUngVien: {
        type: String,
        required: true,
    },
    idNhaTuyenDung: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    soDienThoai: {
        type: String,
    },
    kinhNghiem: {
        type: String,
    },
});

ungTuyen.plugin(mongoosePaginate);

ungTuyen.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("UngVien", ungTuyen);
