const UngVien = require('../model/UngVien')
const bcrypt = require('bcrypt')

const HamXuLyDangKyUngVien = async (req, res) => {
    const { hoVaTen, email, matKhau, soDienThoai, diaChi, isMale, sinhNhat } = req.body
    if ( !hoVaTen || !email || !matKhau ) return res.status(400).json({ 'message': 'Họ và tên, email và password không được để trống!' })

    if (req.body?.matKhau.length < 8) {
        return res.send({ message: 'Mật khẩu phải có ít nhất 8 ký tự!', status: 400 });
    }

    const foundEmail = await UngVien.findOne({ email: email }).exec();
    if (foundEmail) {
        return res.send({ message: 'Địa chỉ email đã được sử dụng!', status: 400 })
    }

    try {
        const hashedPwd = await bcrypt.hash(matKhau, 8)

        const result = await UngVien.create({
            "hoVaTen": hoVaTen,
            "email": email,
            "matKhau": hashedPwd,
            "soDienThoai": soDienThoai,
            "diaChi": diaChi,
            "sinhNhat": sinhNhat,
            "isMale": isMale,
        })

        console.log(result);

        res.status(201).send({ message: `Ứng viên ${hoVaTen} đã đăng ký thành công!` })
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

module.exports = { HamXuLyDangKyUngVien }
