const ApiError = require('../api-error')
const UngVien = require('../model/UngVien')
const NhaTuyenDung = require('../model/NhaTuyenDung')

//Cần bổ sung validate số ký tự mỗi input

const checkDuplicateUsernameOrEmail = async (req, res, next) => {

    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!(emailReg.test(req.body.email))) {
        return next(
            new ApiError(400, 'Địa chỉ email không đúng!')
        )
    }

    // const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
    // const passwordReg = /^[A-z][A-z0-9-_]{3,23}$/
    const passwordReg = /^[a-zA-Z0-9]+$/
    if (!(passwordReg.test(req.body.pwd))) {
        return next(
            new ApiError(400, 'Mật khẩu không hợp lệ!')
        )
    }

    try {
        const [ungVienByEmail] = await Promise.all([
            UngVien.findOne({
                email: req.body.email,
            }),
        ])
        const [nhaTuyenDungByEmail] = await Promise.all([
            NhaTuyenDung.findOne({
                email: req.body.email,
            })
        ])
        if (ungVienByEmail || nhaTuyenDungByEmail) {
            return next(
                new ApiError(422, 'Địa chỉ email đã được sử dụng!')
            )
        }

        return next()
    } catch (error) {
        console.log(error)
        return next(
            new ApiError(500, 'Đã xảy ra lỗi ở máy chủ')
        )
    }
}

module.exports = {
    checkDuplicateUsernameOrEmail,
}
