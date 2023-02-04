require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const verifyJWT = require('./app/middlewares/verifyJWT')
const credentials = require('./app/middlewares/credentials')
const corsOptions = require('./app/config/corsOptions')
const connectDB = require('./app/config/dbConn')

const PORT = process.env.PORT || 3001

connectDB()
app.use(credentials)

app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, '/public')))

app.use('/dang-ky/ung-vien', require('./app/routes/DangKyUngVien'))
app.use('/dang-ky/nha-tuyen-dung', require('./app/routes/DangKyNhaTuyenDung'))
app.use('/dang-nhap', require('./app/routes/DangNhap'))
app.use('/ung-vien', require('./app/routes/UngVien'))
app.use('/nha-tuyen-dung', require('./app/routes/NhaTuyenDung'))
app.use('/cong-viec', require('./app/routes/CongViec'))

app.use('/muc-luong', require('./app/routes/options/MucLuong'))
app.use('/bang-cap', require('./app/routes/options/BangCap'))
app.use('/dia-diem-lam-viec', require('./app/routes/options/DiaDiemLamViec'))
app.use('/kinh-nghiem', require('./app/routes/options/KinhNghiem'))
app.use('/linh-vuc-kinh-doanh', require('./app/routes/options/LinhVucKinhDoanh'))
app.use('/loai-hinh-doanh-nghiep', require('./app/routes/options/LoaiHinhDoanhNghiep'))
app.use('/loai-hop-dong', require('./app/routes/options/LoaiHopDong'))
app.use('/nganh-nghe', require('./app/routes/options/NganhNghe'))

app.get('/', (req, res) => {
    res.json({
        message: "Welcome!"
    })
})

app.post('/post', (req, res) => {
    console.log('Connected to fe');
    res.redirect('/')
})

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});