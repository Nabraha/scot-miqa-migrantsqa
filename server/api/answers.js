const express = require("express");
const moment = require("moment");
const router = express.Router();
const question = require("../services/database/answers");
const { authMiddleware } = require("../auth/passport");

//to get the answers by question id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  question
    .getAnswerByQuestionId(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

router.get("/", (req, res) => {
  question
    .getAllAnswers()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = router;
