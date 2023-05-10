const express = require("express");
const router = express.Router();

const totalControllers = require("../../controllers/Total/Total.controller")

router.get(
    "/api/total",
    totalControllers.totalControllers
);

module.exports = router;
