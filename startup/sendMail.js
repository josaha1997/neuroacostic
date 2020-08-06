const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const config = require("config");

function sendmail(receiver, Subject, Text) {
  const client_id = config.get("client_id");
  const client_secret = config.get("client_secret");
  const mail_refresh_token = config.get("mail_refresh_token");
  const oauth2Client = new OAuth2(
    client_id,
    client_secret,
    "https://developers.google.com/oauthplayground" // Redirect URL
  );
  oauth2Client.setCredentials({
    refresh_token: mail_refresh_token,
  });
  const accessToken = oauth2Client.getAccessToken();

  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "internharman2020@gmail.com",
      clientId: client_id,
      clientSecret: client_secret,
      refreshToken: mail_refresh_token,
      accessToken: accessToken,
    },
  });

  var mailOptions = {
    from: "internharman2020@gmail.com",
    to: receiver,
    subject: Subject,
    generateTextFromHTML: true,
    html: "<b>Respected Sir/Ma'am,</b> <p>" + Text + "</p>",
  };
  return new Promise((resolve, reject) => {
    smtpTransport.sendMail(mailOptions, (error, info) => {
      error ? reject(error) : resolve(info);
      smtpTransport.close();
    });
  });
}
module.exports.sendMail = sendmail;
