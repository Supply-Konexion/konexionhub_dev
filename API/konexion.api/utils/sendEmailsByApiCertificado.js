// sendEmailsByApi.js

const Mailgun = require("mailgun.js");
const formData = require("form-data");
const path = require("path");
const fs = require("fs");

const { config } = require("../config/config");

const mailgun = new Mailgun(formData);
const client = mailgun.client({ username: "api", key: config.mailgunApiKey });

// email sender function
module.exports = function (req, res, next) {
  const filename = "Certificado.pdf";
  const filePath = path.join(__dirname, "../documents", req.mail.pdfFilename);

  // Definimos el email
  var messageData = {
    from: `Usame <${config.mailFrom}>`,
    to: req.mail.to,
    subject: req.mail.subject,
    html: req.mail.html,
    attachment: [{
      data: fs.createReadStream(filePath), // Usa el stream del archivo
      filename: filename // Nombre que deseas que aparezca
    }],
  };

  // Enviamos el email
  client.messages
    .create(config.domain, messageData)
    .then((res) => {
      if (res.status == 200) {
        console.log("Email sent.", res.message);
      }
      return next();
    })
    .catch((err) => {
      console.error(err);
      next();
    });
};