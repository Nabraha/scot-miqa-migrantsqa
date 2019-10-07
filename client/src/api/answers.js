export const getAnswers = () => {
  return fetch("/api/answers").then(res => res.json());
};

export const getUsers = () => {
  return fetch("/api/users").then(res => res.json());
};

export const update = () => {
  return fetch("/api/answers").then(res => res.json());
};

export const getAnswersByQuestionId = questionId => {
  return fetch(`/api/answers/${questionId}`).then(res => res.json());
};
