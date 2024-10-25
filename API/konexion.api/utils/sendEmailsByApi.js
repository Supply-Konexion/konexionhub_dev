// sendEmailsByApi.js

const Mailgun = require("mailgun.js");
const formData = require("form-data");

const { config } = require("../config/config");

const mailgun = new Mailgun(formData);
const client = mailgun.client({ username: "api", key: config.mailgunApiKey });

// email sender function
module.exports = function (req, res, next) {
  // Definimos el email
  var messageData = {
    from: `"Usame Empresas" <${config.mailFrom}>`,
    to: req.mail.to,
    subject: req.mail.subject,
    html: req.mail.html,
    //attachments: [{   // filename and content type is derived from path
    //    path: `../payroll/files/payrolls/${req.payroll.year}/${req.payroll.monthName}/${detail.payment_receipt_file}`
    //}]
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
