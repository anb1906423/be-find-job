const CongViec = require("../../model/CongViec");
const UngVien = require("../../model/UngVien")
const NhaTuyenDung = require("../../model/NhaTuyenDung")
const UngTuyen = require("../../model/ungTuyen")

const totalControllers = async (req, res) => {
    try {
        // Tính tổng số lượng từ CSDL
        const totalUngVien = await UngVien.count();
        const totalNhaTuyenDung = await NhaTuyenDung.count();
        const totalLuotUngTuyen = await UngTuyen.count();
        const totalCongViec = await CongViec.count();

        // Tạo đối tượng JSON chứa kết quả
        const result = {
            totalUngVien,
            totalNhaTuyenDung,
            totalLuotUngTuyen,
            totalCongViec,
        };

        // Trả về kết quả dưới dạng JSON
        res.json(result);
    } catch (error) {
        console.error('Lỗi:', error);
        // Trả về thông báo lỗi nếu có lỗi xảy ra
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}

module.exports = {
    totalControllers,
}