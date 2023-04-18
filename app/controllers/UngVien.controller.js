const UngVien = require("../model/UngVien");
const BadRequestError = require("../api-error");
const handlePromise = require("../helpers/promise.helper");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const paginate = require("mongoose-paginate-v2");

const traVeUngVien = async (req, res) => {
    if (!req?.params?.id)
        return res
            .status(400)
            .json({ message: "id ứng viên không được để trống" });
    const ungVien = await UngVien.findOne({ _id: req.params.id }).exec();
    if (!ungVien) {
        return res
            .status(204)
            .json({ message: `User ID ${req.params.id} not found` });
    }
    res.json(ungVien);
};

const traVeTatCaUngVien = async (req, res) => {
    const options = {
        limit: req?.query.limit || 1,
        page: req?.query.page || 1,
    };

    const { docs, ...pagination } = await UngVien.paginate({}, options);

    const data = {
        data: docs,
        meta: {
            ...pagination,
        },
    };

    console.log(pagination);

    if (!docs)
        return res
            .status(204)
            .json({ message: "Không tìm thấy ứng viên nào!" });
    res.json(data);
};

const timKiemUngVienQuaEmail = async (req, res) => {
    const email = req.body.email;

    try {
        // Tìm kiếm ứng viên có email khớp với từ khóa tìm kiếm
        const result = await UngVien.find({
            email: { $regex: new RegExp(email, "i") },
        });

        // Gửi kết quả trả về cho client
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
};

const capNhatThongTinUngVien = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new BadRequestError(400, "Dữ liệu không được để trống!"));
    }

    const { id } = req.params;

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return next(new BadRequestError(400,
    //         'Id không hợp lệ!'))
    // }

    const condition = {
        _id: id,
    };

    const [error, document] = await handlePromise(
        UngVien.findOneAndUpdate(condition, req.body, {
            new: true,
        })
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Đã xảy ra lỗi khi cập nhật thông tin ứng viên có id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Không tìm thấy ứng viên!"));
    }

    return res.send({ message: "Cập nhật thông tin ứng viên thành công!" });
};

const HamThayDoiMatKhau = async (req, res) => {
    const { id, matKhauCu, matKhauMoi } = req.body;
    if (!id || !matKhauCu || !matKhauMoi)
        return res.status(400).json({
            message: "id, mật khẩu cũ và mật khẩu mới không được để trống!",
        });
    if (req.body?.matKhauMoi.length < 8) {
        return res.send({
            message: "Mật khẩu mới phải có ít nhất 8 ký tự!",
            status: 400,
        });
    }

    const foundUngVien = await UngVien.findById(id).exec();
    if (!foundUngVien) {
        return res
            .status(404)
            .json({ message: "Không tìm thấy người dùng với email này!" });
    }

    const isMatch = await bcrypt.compare(matKhauCu, foundUngVien.matKhau);
    if (!isMatch)
        return res
            .status(401)
            .json({ message: "Mật khẩu cũ không chính xác!" });

    try {
        const hashedPwd = await bcrypt.hash(matKhauMoi, 8);
        const updatedUngVien = await UngVien.findByIdAndUpdate(
            id,
            { matKhau: hashedPwd },
            { new: true }
        );

        res.status(200).send({ message: "Thay đổi mật khẩu thành công!" });
    } catch (err) {
        res.status(500).json({
            message:
                "Đã xảy ra lỗi khi thay đổi mật khẩu, vui lòng thử lại sau!",
                dataErr:`${err}`
        });
    }
};

const onState = async (req, res, next) => {
    const ung_vien_id = req.body.ung_vien_id;
    if (!ung_vien_id)
        return res.status(400).send("Trường ung_vien_id không tồn tại");

    try {
        // Update the matching document to set the `state` field to `true`
        const updatedUngVien = await UngVien.findByIdAndUpdate(
            ung_vien_id,
            { state: true },
            { new: true } // Return the updated document
        );

        return res.send(updatedUngVien);
    } catch (error) {
        res.status(500).json({
            message: "Đã xảy ra lỗi khi thay đổi trạng thái ứng viên!",
        });
    }
};

const offState = async (req, res, next) => {
    const ung_vien_id = req.body.ung_vien_id;
    if (!ung_vien_id)
        return res.status(400).send("Trường ung_vien_id không tồn tại");

    try {
        // Update the matching document to set the `state` field to `true`
        const updatedUngVien = await UngVien.findByIdAndUpdate(
            ung_vien_id,
            { state: false },
            { new: true } // Return the updated document
        );

        return res.send(updatedUngVien);
    } catch (error) {
        res.status(500).json({
            message: "Đã xảy ra lỗi khi thay đổi trạng thái ứng viên!",
        });
    }
};

module.exports = {
    traVeUngVien,
    traVeTatCaUngVien,
    timKiemUngVienQuaEmail,
    capNhatThongTinUngVien,
    HamThayDoiMatKhau,
    onState,
    offState,
};
