const nodemailer = require("../config/nodemailer");

module.exports.newComment = (comment) => {
  let htmlString = nodemailer.renderTemplate(
    { comment: comment },
    "/comments/new_coment.ejs"
  );

  nodemailer.transporter.sendMail(
    {
      from: "Deepak Jena deepak@google.com",
      to: comment.user.email,
      subject: "New Comment Published !",
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending mail", err);
        return;
      }
      console.log("Mail Sent", info);
      return;
    }
  );
};
