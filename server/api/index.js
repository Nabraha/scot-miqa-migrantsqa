const express = require("express");
const router = express.Router();
const users = require("./users");
const questions = require("./questions");
const answers = require("./answers");
const status = require("./status");
const sendMail = require("./sendMail");

router.use("/users", users);
router.use("/status", status);
router.use("/questions", questions);
router.use("/answers", answers);
router.use("/answers", answers);
router.use("/email", sendMail);

module.exports = router;
