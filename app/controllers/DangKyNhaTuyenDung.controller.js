const NhaTuyenDung = require('../model/NhaTuyenDung')
const UngVien = require('../model/UngVien')
const bcrypt = require('bcrypt')

const HamXuLyDangKyNhaTuyenDung = async (req, res) => {
    const { logoCty, tenCty, email, matKhau, soDienThoai, diaChi, maSoThue } = req.body
    if ( !tenCty || !email || !matKhau || !soDienThoai || !diaChi || !maSoThue ) return res.status(400).json({ 'message': 'Tên công ty, email, số điện thoại, địa chỉ, mã số thuế và password không được để trống!' })

    if (req.body?.matKhau.length < 8) {
        return res.send({ message: 'Mật khẩu phải có ít nhất 8 ký tự!', status: 400 });
    }

    const foundEmail = await NhaTuyenDung.findOne({ email: email }).exec();
    const foundEmailUngVien = await UngVien.findOne({ email: email }).exec();
    if (foundEmail || foundEmailUngVien) {
        return res.send({ message: 'Địa chỉ email đã được sử dụng!', status: 400 })
    }

    // const foundPhoneNumber = await NhaTuyenDung.findOne({ phoneNumber: phoneNumber }).exec();
    // if (foundPhoneNumber) {
    //     return res.send({ message: 'Số điện thoại đã được sử dụng!', status: 400 })
    // }

    try {
        const hashedPwd = await bcrypt.hash(matKhau, 8)

        const result = await NhaTuyenDung.create({
            "tenCty": tenCty,
            "email": email,
            "matKhau": hashedPwd,
            "soDienThoai": soDienThoai,
            "diaChi": diaChi,
            "maSoThue": maSoThue,
            "logoCty": logoCty,
        })

        console.log(result);

        res.status(201).send({ message: `Công ty ${tenCty} đã đăng ký thành công!` })
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

module.exports = { HamXuLyDangKyNhaTuyenDung }
