const nodemailer = require("nodemailer");
export async function sendEmail(email, subject, html) {
  // Sending Email ------------------->
  var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_PASS,
    },
  });

  var mailOptions = {
    from: "Corsult " + process.env.ADMIN_EMAIL,
    to: email,
    subject,
    html,
  };
  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info.response);
      }
    });
  });

  // Sending Email ------------------->
}
