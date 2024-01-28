const express = require("express");
const router = express.Router();
const { generateImage, modifyImage } = require("../controllers/OpenaiControllers");

router.post("/generate", generateImage)
router.post("/modify", modifyImage)

module.exports = router;