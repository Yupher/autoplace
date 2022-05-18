const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

const sendEmail = (email, context) => {
  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    auth: {
      user: "bettershoptest@outlook.com", // TODO: your gmail account
      pass: "Aa123456789", // TODO: your gmail password
    },
  });

  transporter.use(
    "compile",
    hbs({
      viewEngine: "handle-handlebars",
      viewPath: "./",
    }),
  );

  let mailOptions = {
    from: "bettershoptest@outlook.com", // TODO: email sender
    // to: email, // TODO: email receiver
    to: email,
    subject: "IA SHOP - Register",
    text: "Confirm your email",
    template: "handle",
    context,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      return console.log(err);
    }
    return console.log("Email sent!!!");
  });
};

module.exports = sendEmail;
