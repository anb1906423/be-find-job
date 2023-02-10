const QuanTriVien = require('../model/QuanTriVien')
const UngVien = require('../model/UngVien')
const NhaTuyenDung = require('../model/NhaTuyenDung')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const XuLyDangKyQuanTriVien = async (req, res) => {
    const { hoVaTen, email, matKhau } = req.body
    if (!hoVaTen || !email || !matKhau) return res.status(400).json({ 'message': 'Họ và tên, email và password không được để trống!' })

    if (req.body?.matKhau.length < 8) {
        return res.send({ message: 'Mật khẩu phải có ít nhất 8 ký tự!', status: 400 });
    }

    const foundEmail = await QuanTriVien.findOne({ email: email }).exec();
    const foundEmailUngVien = await UngVien.findOne({ email: email }).exec();
    const foundEmailNhaTuyenDung = await NhaTuyenDung.findOne({ email: email }).exec();
    
    if (foundEmail || foundEmailUngVien || foundEmailNhaTuyenDung) {
        return res.send({ message: 'Địa chỉ email đã được sử dụng!', status: 400 })
    }

    try {
        const hashedPwd = await bcrypt.hash(matKhau, 8)

        const result = await QuanTriVien.create({
            "hoVaTen": hoVaTen,
            "email": email,
            "matKhau": hashedPwd,
        })

        console.log(result);

        res.status(201).send({ message: `Bạn ${hoVaTen} đã là quản trị viên của hệ thống!` })
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

const DangNhapQuanTriVien = async (req, res) => {
    const cookies = req.cookies

    const { email, matKhau } = req.body;
    if (!email || !matKhau) return res.status(400).json({ "message": "Email and password are required" })
    const foundQuanTriVien = await QuanTriVien.findOne({ email: email }).exec()
    if (!foundQuanTriVien) {
        res.status(401).send({ message: 'Thông tin tài khoản hoặc mật khẩu không chính xác!' }) //Incorrect username or password!
        return
    }
    const match = await bcrypt.compare(matKhau, foundQuanTriVien.matKhau);
    if (!match) {
        res.status(401).send({ message: 'Thông tin tài khoản hoặc mật khẩu không chính xác!' }) //Incorrect username or password!
        return
    }
    if (match) {
        const roles = foundQuanTriVien.roles
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "email": foundQuanTriVien.email,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET || 'access-token-secret',
            { expiresIn: '10s' }
        );
        const newRefreshToken = jwt.sign(
            { "email": foundQuanTriVien.email },
            process.env.REFRESH_TOKEN_SECRET || 'refresh-token-secret',
            { expiresIn: '15s' }
        );

        // Changed to let keyword
        let newRefreshTokenArray =
            !cookies?.jwt
                ? foundQuanTriVien.refreshToken
                : foundQuanTriVien.refreshToken.filter(rt => rt !== cookies.jwt);

        if (cookies?.jwt) {

            /* 
            Scenario added here: 
                1) User logs in but never uses RT and does not logout 
                2) RT is stolen
                3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
            */
            const refreshToken = cookies.jwt;
            const foundToken = await QuanTriVien.findOne({ refreshToken }).exec();

            // Detected refresh token reuse!
            if (!foundToken) {
                // clear out ALL previous refresh tokens
                newRefreshTokenArray = [];
            }

            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        }

        // Saving refreshToken with current user
        foundQuanTriVien.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        // const result = await foundQuanTriVien.save();

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.json({ accessToken, email, roles, id: foundQuanTriVien._id });

    } else {
        res.sendStatus(401);
    }
}

const traVeTatCaQuanTriVien = async (req, res) => {
    const quanTriVien = await QuanTriVien.find();
    if (!quanTriVien) return res.status(204).json({ 'message': 'Không tìm thấy quản trị viên nào!' });
    res.json(quanTriVien);
}

const xoaQuanTriVien = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": 'id quản trị viên không được để trống!' });
    const quanTriVien = await QuanTriVien.findOne({ _id: req.body.id }).exec();
    
    const soLuongQuanTriVien = await QuanTriVien.countDocuments({});
    if (soLuongQuanTriVien === 1) {
        return res.status(400).json({ 'message': 'Không thể xóa quản trị viên cuối cùng' });
    }

    if (!quanTriVien) {
        return res.status(400).json({ 'message': `quanTriVien ID ${req.body.id} not found` });
    }
    const result = await quanTriVien.deleteOne({ _id: req.body.id });
    res.json(result);
}

module.exports = {
    XuLyDangKyQuanTriVien,
    DangNhapQuanTriVien,
    traVeTatCaQuanTriVien,
    xoaQuanTriVien
}