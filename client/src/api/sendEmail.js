export const sendNotificationEmail = (recipient, message) => {
  const postData = {
    method: "POST",
    body: JSON.stringify({ recipient, message }),
    headers: { "Content-Type": "application/json" }
  };
  return fetch("/api/email/mail", postData);
};
