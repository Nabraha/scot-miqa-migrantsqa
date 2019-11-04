const mailgun = require("mailgun-js");
exports.sendEmail = (recipient, message, attachment) =>
  new Promise((resolve, reject) => {
    const DOMAIN = "sandboxf279009d26344a8fb909701a8bdedafd.mailgun.org";
    const mg = mailgun({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: DOMAIN
    });
    const data = {
      from: "<info@Miqa.com>",
      to: recipient,
      subject: message.subject,
      text: message.text,
      inline: attachment,
      html: message.html
    };
    mg.messages().send(data, function(error, body) {
      if (error) {
        return reject(error);
      }
      return resolve(body);
    });
  });
