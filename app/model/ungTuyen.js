const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ungTuyenSchema = new mongoose.Schema({
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
    emailUngVien: {
        type: String,
        required: true,
    },
    emailNhaTuyenDung: {
        type: String,
        required: true,
    },
    soDienThoai: {
        type: String,
        required: true,
    },
    isNotify: {
        type: Boolean,
        default: true,
    },
    isNew: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

ungTuyenSchema.plugin(mongoosePaginate);

const UngTuyen = mongoose.model("UngTuyen", ungTuyenSchema);

module.exports = UngTuyen;
