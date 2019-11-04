export const getAnswers = () => {
  return fetch("/api/answers").then(res => res.json());
};

export const getUsers = () => {
  return fetch("/api/users").then(res => res.json());
};

export const acceptAnswers = (questionId, isAccepted, id) => {
  const token = localStorage.getItem("token");
  const updateData = {
    method: "POST",
    body: JSON.stringify({
      questionId: questionId,
      isAccepted: isAccepted,
      id: id
    }),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    }
  };
  return fetch("/api/answers/accept-answer", updateData).then(res => {
    if (res.status >= 200 && res.status < 300) {
      return res.json();
    } else {
      throw res;
    }
  });
};

export const getAnswersByQuestionId = questionId => {
  return fetch(`/api/answers/${questionId}`).then(res => res.json());
};

export const deleteAnswer = answerId => {
  return fetch(`/api/answers/${answerId}`, { method: "DELETE" }).then(res =>
    res.json()
  );
};
