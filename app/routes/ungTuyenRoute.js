const ungTuyenController = require("../controllers/ungTuyenController");

const router = require("express").Router();

const initAlUngTuyenRouter = (app) => {
    router.get("/home", (req, res) => {
        res.status(200).json({
            msg: "Hello welcome to ung tuyen router!",
        });
    });
    router.post("/send-email", ungTuyenController.sendEmail);

    app.use("/api/v1/ung-tuyen", router);
};

module.exports = initAlUngTuyenRouter;
