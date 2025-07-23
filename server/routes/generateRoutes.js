const express = require("express");
const router = express.Router();
const { generateContent } = require("../controllers/generateController");

router.post("/", generateContent);

module.exports = router;
