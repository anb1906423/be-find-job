const express = require("express");
const router = express.Router();

const CongViecController = require("../controllers/CongViec.controller");

router.get(
    "/bai-dang-cong-ty",
    CongViecController.traVeTatCaCongViecCuaNhaTuyenDung
);
router.get("/", CongViecController.traVeTatCaCongViec);
router.get("/:id", CongViecController.traVeCongViec);
router.post("/search", CongViecController.timKiemCongViecQuaDiaDiem);
router.post("/create", CongViecController.DangBaiTuyenDung); 
router.put("/update/:id", CongViecController.capNhatCongViec);

router.delete("/delete/:id", CongViecController.xoaCongViec);
router.put("/on", CongViecController.onState);
router.put("/off", CongViecController.offState);

module.exports = router;
