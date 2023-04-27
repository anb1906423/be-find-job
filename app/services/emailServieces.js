require('dotenv').config();
const nodemailer = require('nodemailer');

class EmailServieces {
    async sendEmailToNhaTuyenDung(dataSend) {
        try {
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                debug: false,
                logger: false,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.EMAIL_APP_NAME, // generated ethereal user
                    pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: 'DreamJob - Website tìm kiếm việc làm', // sender address
                to: dataSend.emailNhaTuyenDung, // list of receivers
                subject: `Ứng tuyển ${dataSend.tenJob} - ${dataSend.hoVaTen}`, // Subject line
                html: this.getLanguageBodyHTML(dataSend), // html body
            });
        } catch (error) {
            console.log(error);
        }
    }

    getLanguageBodyHTML = (dataSend) => {
        let Result = `<div style="padding: 20px; margin: 20px; border: 1px solid #ccc">
        <h2 style="color: #0052cc; font-size: 24px; margin-bottom: 20px">
            Thông báo tuyển dụng
        </h2>
        <p style="font-size: 16px; line-height: 1.5">Xin chào ${dataSend.tenCongty}.</p>
        <p style="font-size: 16px; line-height: 1.5">
            Tôi là Thanh Thảo, đại diện cho website tìm kiếm việc làm DreamJob.
            Tôi xin thông báo rằng đã có một ứng viên đã nộp hồ sơ ứng tuyển vào vị trí mà công ty của bạn đang tuyển dụng vào lúc:
            <span style="margin: 0 8px;">${new Date(+dataSend?.time)}</span>
        </p>
        <table style="border-collapse: collapse; width: 100%; margin: 20px 0">
            <tr>
                <td style="border: 1px solid #ccc; padding: 10px">Email ứng viên:</td>
                <td style="border: 1px solid #ccc; padding: 10px">${dataSend?.emailUngVien}</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ccc; padding: 10px">Tên ứng viên:</td>
                <td style="border: 1px solid #ccc; padding: 10px">${dataSend?.hoVaTen}</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ccc; padding: 10px">
                    Số điện thoại:
                </td>
                <td style="border: 1px solid #ccc; padding: 10px">${dataSend?.soDienThoai}</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ccc; padding: 10px">Địa chỉ:</td>
                <td style="border: 1px solid #ccc; padding: 10px">
                ${dataSend?.diaChi}
                </td>
            </tr>
        </table>
        ${dataSend.markDown &&
            `<div style="margin: 10px">
                    <label style="font-weight: 700; margin: 6px 0;">
                        Lời nhắn của ứng viên
                    </label>
                    <p>${dataSend.markDown}</p>
                </div>`
            }
       
        <p style="font-size: 16px; line-height: 1.5">
            Chúc công ty luôn thành công.
        </p>
        <p style="font-size: 16px; line-height: 1.5">Trân trọng,</p>
        <p style="font-size: 16px; line-height: 1.5"><strong>Thanh Thảo</strong></p>
    </div>
    `;

        return Result;
    };
}

module.exports = new EmailServieces();
