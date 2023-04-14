const emailServieces = require("./emailServieces");

class ungTuyenServices {
    sendEmail(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.email) {
                    return resolve({
                        errCode: 1,
                        msg: "missing required parameters",
                    });
                }

                const check = await emailServieces.sendSimpleEmail(data);

                console.log(check);

                resolve({
                    errCode: 0,
                    msg: "Successfully send email",
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = new ungTuyenServices();
