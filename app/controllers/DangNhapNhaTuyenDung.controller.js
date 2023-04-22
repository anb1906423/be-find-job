const NhaTuyenDung = require('../model/NhaTuyenDung');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UngVien = require('../model/UngVien');

const DangNhapNhaTuyenDung = async (req, res) => {
    const cookies = req.cookies;

    const { email, matKhau, isLoginFireBase = false } = req.body;
    if (!email || !matKhau) return res.status(400).json({ message: 'Email and password are required' });

    if (!isLoginFireBase) {
        const foundNhaTuyenDung = await NhaTuyenDung.findOne({ email: email }).exec();
        if (!foundNhaTuyenDung) {
            res.status(401).send({ message: 'Thông tin tài khoản hoặc mật khẩu không chính xác!' }); //Incorrect username or password!
            return;
        } else if (foundNhaTuyenDung?.isLoginFireBase === true) {
            res.status(401).send({
                message:
                    'Tài Khoản của bạn đươc login bằng google vui lòng đăng nhập tài khoản google và thực hiện login !',
            }); //Incorrect username or password!
            return;
        }
        const match = await bcrypt.compare(matKhau, foundNhaTuyenDung.matKhau);
        if (!match) {
            res.status(401).send({ message: 'Thông tin tài khoản hoặc mật khẩu không chính xác!' }); //Incorrect username or password!
            return;
        }
        if (match) {
            const roles = foundNhaTuyenDung.roles;
            // create JWTs
            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        email: foundNhaTuyenDung.email,
                        roles: roles,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET || 'access-token-secret',
                { expiresIn: '10s' },
            );
            const newRefreshToken = jwt.sign(
                { email: foundNhaTuyenDung.email },
                process.env.REFRESH_TOKEN_SECRET || 'refresh-token-secret',
                { expiresIn: '15s' },
            );

            // Changed to let keyword
            let newRefreshTokenArray = !cookies?.jwt
                ? foundNhaTuyenDung.refreshToken
                : foundNhaTuyenDung.refreshToken.filter((rt) => rt !== cookies.jwt);

            if (cookies?.jwt) {
                /* 
            Scenario added here: 
                1) User logs in but never uses RT and does not logout 
                2) RT is stolen
                3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
            */
                const refreshToken = cookies.jwt;
                const foundToken = await NhaTuyenDung.findOne({ refreshToken }).exec();

                // Detected refresh token reuse!
                if (!foundToken) {
                    // clear out ALL previous refresh tokens
                    newRefreshTokenArray = [];
                }

                res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            }

            // Saving refreshToken with current user
            foundNhaTuyenDung.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            // const result = await foundNhaTuyenDung.save();

            // Creates Secure Cookie with refresh token
            res.cookie('jwt', newRefreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 24 * 60 * 60 * 1000,
            });

            // Send authorization roles and access token to user
            res.json({ accessToken, email, roles, id: foundNhaTuyenDung._id, isLoginFireBase });
        } else {
            res.sendStatus(401);
        }
    } else {
        let foundNhaTuyenDung = await NhaTuyenDung.findOne({ email: email, isLoginFireBase: true }).exec();
        const foundEmailUngVien = await UngVien.findOne({ email: email }).exec();

        const data = req.body;

        if (foundEmailUngVien) {
            res.status(401).send({ message: 'Email đã được sử dụng' }); //Incorrect username or password!
            return;
        }

        if (!foundNhaTuyenDung) {
            if (data.name) {
                foundNhaTuyenDung = await NhaTuyenDung.create({
                    tenCty: data.name,
                    email: email,
                    soDienThoai: data.soDienThoai || 'Đang cập nhật',
                    diaChi: 'Đang cập nhật',
                    maSoThue: 'Đang cập nhật',
                    logoCty: data.logoCty || '',
                    isLoginFireBase: true,
                    matKhau: data.matKhau || '12345678',
                });
            }
        }
        const roles = foundNhaTuyenDung.roles;
        // create JWTs
        const accessToken = jwt.sign(
            {
                UserInfo: {
                    email: foundNhaTuyenDung.email,
                    roles: roles,
                    isLoginFireBase: true,
                },
            },
            process.env.ACCESS_TOKEN_SECRET || 'access-token-secret',
            { expiresIn: '10s' },
        );
        const newRefreshToken = jwt.sign(
            { email: foundNhaTuyenDung.email },
            process.env.REFRESH_TOKEN_SECRET || 'refresh-token-secret',
            { expiresIn: '15s' },
        );

        // Changed to let keyword
        let newRefreshTokenArray = !cookies?.jwt
            ? foundNhaTuyenDung.refreshToken
            : foundNhaTuyenDung.refreshToken.filter((rt) => rt !== cookies.jwt);

        if (cookies?.jwt) {
            /* 
            Scenario added here: 
                1) User logs in but never uses RT and does not logout 
                2) RT is stolen
                3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
            */
            const refreshToken = cookies.jwt;
            const foundToken = await NhaTuyenDung.findOne({ refreshToken }).exec();

            // Detected refresh token reuse!
            if (!foundToken) {
                // clear out ALL previous refresh tokens
                newRefreshTokenArray = [];
            }

            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        }

        // Saving refreshToken with current user
        foundNhaTuyenDung.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        // const result = await foundNhaTuyenDung.save();

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000,
        });

        // Send authorization roles and access token to user
        res.json({ accessToken, email, roles, id: foundNhaTuyenDung._id, isLoginFireBase });
    }
};

module.exports = { DangNhapNhaTuyenDung };
