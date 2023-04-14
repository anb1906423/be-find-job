const ungTuyenServices = require("../services/ungTuyenServices");

class ungTuyenController {
    async sendEmail(req, res) {
        try {
            const data = await ungTuyenServices.sendEmail(req.body);

            return res.status(200).json(data);
        } catch (error) {
            return res.status(200).json({
                errCode: -1,
                msg: "error from server",
                dataErr: error,
            });
        }
    }
}

module.exports = new ungTuyenController();
