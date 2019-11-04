const express = require("express");
const router = express.Router();
const answerDb = require("../services/database/answers");

//to get the answers by question id
router.get("/:id", (req, res) => {
	const { id } = req.params;
	answerDb
		.getAnswerByQuestionId(id)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			console.error(err);
			res.sendStatus(500);
		});
});

router.get("/", (req, res) => {
	answerDb
		.getAllAnswers()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			console.error(err);
			res.sendStatus(500);
		});
});

router.post("/accept-answer", async (req, res, next) => {
	const { questionId, isAccepted, id } = req.body;
	answerDb
		.acceptAnswer(questionId, isAccepted, id)
		.then(() => {
			res.send({
				success: true,
				message: "Answer accepted"
			});
		})
		.catch((err) => {
			console.error(err);
			next(err);
		});
});

router.delete("/:answerId([0-9]+)", (req, res) => {
	const { answerId } = req.params;
	answerDb
		.deleteAnswer(answerId)
		.then((data) => {
			res.send({ success: true });
		})
		.catch((err) => {
			console.error(err);
			res.sendStatus(500);
		});
});

module.exports = router;
