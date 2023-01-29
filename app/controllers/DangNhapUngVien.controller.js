const UngVien = require('../model/UngVien')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const DangNhapUngVien = async (req, res) => {
    const cookies = req.cookies

    const { email, matKhau } = req.body;
    if (!email || !matKhau) return res.status(400).json({ "message": "Email and password are required" })
    const foundUngVien = await UngVien.findOne({ email: email }).exec()
    if (!foundUngVien) {
        res.status(401).send({ message: 'Thông tin tài khoản hoặc mật khẩu không chính xác!' }) //Incorrect username or password!
        return
    }
    const match = await bcrypt.compare(matKhau, foundUngVien.matKhau);
    if (!match) {
        res.status(401).send({ message: 'Thông tin tài khoản hoặc mật khẩu không chính xác!' }) //Incorrect username or password!
        return
    }
    if (match) {
        const roles = foundUngVien.roles
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "email": foundUngVien.email,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET || 'access-token-secret',
            { expiresIn: '10s' }
        );
        const newRefreshToken = jwt.sign(
            { "email": foundUngVien.email },
            process.env.REFRESH_TOKEN_SECRET || 'refresh-token-secret',
            { expiresIn: '15s' }
        );

        // Changed to let keyword
        let newRefreshTokenArray =
            !cookies?.jwt
                ? foundUngVien.refreshToken
                : foundUngVien.refreshToken.filter(rt => rt !== cookies.jwt);

        if (cookies?.jwt) {

            /* 
            Scenario added here: 
                1) User logs in but never uses RT and does not logout 
                2) RT is stolen
                3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
            */
            const refreshToken = cookies.jwt;
            const foundToken = await UngVien.findOne({ refreshToken }).exec();

            // Detected refresh token reuse!
            if (!foundToken) {
                // clear out ALL previous refresh tokens
                newRefreshTokenArray = [];
            }

            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        }

        // Saving refreshToken with current user
        foundUngVien.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        // const result = await foundUngVien.save();

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.json({ accessToken, email, roles });

    } else {
        res.sendStatus(401);
    }
}

module.exports = { DangNhapUngVien };
