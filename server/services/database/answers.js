const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

const getAllAnswers = () => {
	return new Promise((resolve, reject) => {
		pool.query(
			`select users.id as user_id, users.username, tmp.id as question_id,  
      answers.id, answers.is_accepted, answers.content, answers.date_answered
            from (select * from questions order by date_posted desc limit 10) as tmp
            inner join answers on tmp.id = answers.question_id
            inner join users on users.id = answers.user_id order by date_answered desc limit 10;`,
			(error, result) => {
				if (error) {
					console.error(error);
					reject(error);
				} else {
					resolve(result.rows);
				}
			}
		);
	});
};

const acceptAnswer = (questionId, isAccepted, id) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`UPDATE answers set is_accepted=false where question_id=$1`,
			[questionId],
			(error, result) => {
				if (error) {
					console.error(error);
					reject(error);
				}
				pool.query(
					`UPDATE answers set is_accepted=$1 where id=$2`,
					[isAccepted, id],
					(error, result) => {
						if (error) {
							console.error(error);
							return reject(error);
						}
						resolve(result.rows);
					}
				);
			}
		);
	});
};

// get Answers of question By Question id
const getAnswerByQuestionId = (id) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT 
      users.id as user_id,
      users.username,
      answers.content,
      answers.date_answered,
      answers.question_id
       FROM 
       answers  
      INNER JOIN users ON users.id = answers.user_id 
      WHERE question_id =${id}`,

			(error, result) => {
				if (error) {
					console.error(error);
					return reject(error);
				}
				resolve(result.rows);
			}
		);
	});
};
const deleteAnswer = (id) => {
	return new Promise((resolve, reject) => {
		pool.query(`DELETE FROM answers WHERE id=${id}`, (error, result) => {
			if (error) {
				console.error(error);
				return reject(error);
			}
			console.log(result);
			resolve(result.rows);
		});
	});
};

module.exports = {
	getAllAnswers,
	acceptAnswer,
	getAnswerByQuestionId,
	deleteAnswer
};
