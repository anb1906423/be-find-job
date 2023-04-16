const ungTuyenServices = require("../services/ungTuyenServices");

class ungTuyenController {
    async SendDataApplyNhaTuyenDung(req, res) {
        try {
            const data = await ungTuyenServices.SendDataApplyNhaTuyenDung(
                req.body
            );

            return res.status(200).json(data);
        } catch (error) {
            console.log(error);
            return res.status(200).json({
                errCode: -1,
                msg: "error from server",
                dataErr: `${error}`,
            });
        }
    }

    async GetLimitUngVienUngTuyen(req, res) {
        try {
            const data = await ungTuyenServices.GetLimitUngVienUngTuyen(
                req.query.page,
                req.query.limit,
                req.body.idQuery,
                req.body.type,
                req.query.queryType
            );

            return res.status(200).json(data);
        } catch (error) {
            console.log(error);
            return res.status(200).json({
                errCode: -1,
                msg: "error from server",
                dataErr: `${error}`,
            });
        }
    }

    async PostCheckIsNew(req, res) {
        try {
            const data = await ungTuyenServices.PostCheckIsNew(req.body.id);

            return res.status(200).json(data);
        } catch (error) {
            console.log(error);
            return res.status(200).json({
                errCode: -1,
                msg: "error from server",
                dataErr: `${error}`,
            });
        }
    }

    async TrashungVienUngVienUngTuyen(req, res) {
        try {
            const data = await ungTuyenServices.TrashungVienUngVienUngTuyen(
                req.body
            );

            return res.status(200).json(data);
        } catch (error) {
            console.log(error);
            return res.status(200).json({
                errCode: -1,
                msg: "error from server",
                dataErr: `${error}`,
            });
        }
    }
}

module.exports = new ungTuyenController();
