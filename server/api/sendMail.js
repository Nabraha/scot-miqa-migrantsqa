const express = require("express");
const router = express.Router();
const emailUtil = require("../api/email-util");
const { sendEmail } = emailUtil;
router.post("/mail", async (req, res, next) => {
  const { recipient, message } = req.body;
  try {
    await sendEmail(recipient, message);
    res.json({ message: "Your query has been sent" });
    await next();
  } catch (e) {
    await next(e);
  }
});
module.exports = router;
