const ungTuyenController = require("../controllers/ungTuyenController");

const router = require("express").Router();

const initAlUngTuyenRouter = (app) => {
    router.post("/send-email", ungTuyenController.SendDataApplyNhaTuyenDung);
    router.get(
        "/get-all-limit-ung-vien-ung-tuyen",
        ungTuyenController.GetLimitUngVienUngTuyen
    );
    router.post("/post-check-isNew", ungTuyenController.PostCheckIsNew);
    router.post(
        "/trash-ung-vien-ung-tuyen",
        ungTuyenController.TrashungVienUngVienUngTuyen
    );

    app.use("/api/v1/ung-tuyen", router);
};

module.exports = initAlUngTuyenRouter;
