export const getQuestions = () => {
  return fetch("/api/questions").then(res => res.json());
};

export const getUsers = () => {
  return fetch("/api/users").then(res => res.json());
};

export const getUserById = id => {
  return fetch(`/api/users/${id}`).then(res => res.json());
};

export const getQuestionsTags = () => {
  return fetch("/api/questions/questionTags").then(res => res.json());
};

export const postQuestion = (content, tags, isAnswered, score) => {
  const token = localStorage.getItem("token");
  const postedData = {
    method: "POST",
    body: JSON.stringify({
      content,
      tags,
      isAnswered,
      score
    }),

    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    }
  };
  return fetch("/api/questions", postedData);
};

export const postAnswer = (content, tags, questionId) => {
  const token = localStorage.getItem("token");
  const postedAnswer = {
    method: "POST",
    body: JSON.stringify({
      content,
      tags
    }),

    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    }
  };
  return fetch(`/api/questions/${questionId}/answers`, postedAnswer);
};

export const update = () => {
  return fetch("/api/update").then(res => res.json());
};

export const updateScore = (score, id) => {
  const updatedScore = {
    method: "PUT",
    body: JSON.stringify({
      score: score,
      id: id
    }),
    headers: { "Content-Type": "application/json" }
  };

  return fetch("/api/questions/update-question-score", updatedScore);
};
// get all questions for question page
export const getQuestionByQuestionId = questionId => {
  return fetch(`/api/questions/${questionId}`).then(res => res.json());
};
// get questions for profile by userID
export const getQuestionsByUserIdForProfilePage = userId => {
  return fetch(`/api/questions/${userId}/Profile`).then(res => res.json());
};
