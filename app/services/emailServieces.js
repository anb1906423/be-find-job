require("dotenv").config();
const nodemailer = require("nodemailer");

class EmailServieces {
    async sendSimpleEmail(dataSend) {
        try {
            console.log("check data send :", dataSend.email);
            console.log(
                "check process.env.EMAIL_APP_NAME : ",
                process.env.EMAIL_APP_NAME
            );
            console.log(
                "check process.env.EMAIL_APP_PASSWORD : ",
                process.env.EMAIL_APP_PASSWORD
            );
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                debug: false,
                logger: false,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: "truongsonpt.80@gmail.com", // generated ethereal user
                    pass: "dexkvtwmndfnfome", // generated ethereal password
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: "Find Job Trang Wen Ứng Tuyển Và Tìm Kiếm Việc Làm", // sender address
                to: "anb1906423@student.ctu.edu.vn", // list of receivers
                subject: "Thông Báo Từ WebSite", // Subject line
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
        <p style="font-size: 16px; line-height: 1.5">Kính gửi công ty ABC,</p>
        <p style="font-size: 16px; line-height: 1.5">
            Chúng tôi xin thông báo rằng có một ứng viên đã nộp đơn tuyển dụng vào
            công ty của bạn.
        </p>
        <table style="border-collapse: collapse; width: 100%; margin: 20px 0">
            <tr>
                <td style="border: 1px solid #ccc; padding: 10px">Tên ứng viên:</td>
                <td style="border: 1px solid #ccc; padding: 10px">Nguyễn Văn A</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ccc; padding: 10px">
                    Số điện thoại:
                </td>
                <td style="border: 1px solid #ccc; padding: 10px">0987654321</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ccc; padding: 10px">Địa chỉ:</td>
                <td style="border: 1px solid #ccc; padding: 10px">
                    Số 1 đường ABC, Quận XYZ, TP.HCM
                </td>
            </tr>
        </table>
        <p style="font-size: 16px; line-height: 1.5">
            Chúng tôi hy vọng thông tin này sẽ hữu ích cho công ty của bạn và xin
            chúc công ty luôn thành công.
        </p>
        <p style="font-size: 16px; line-height: 1.5">Trân trọng,</p>
        <p style="font-size: 16px; line-height: 1.5">Ban tuyển dụng</p>
    </div>
    `;

        return Result;
    };
}

module.exports = new EmailServieces();
