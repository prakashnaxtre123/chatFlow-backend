const express = require("express");
const router = express.Router();

router.use("/post", require("./post"));
router.use("/tree", require("./tree"));




module.exports = router;
