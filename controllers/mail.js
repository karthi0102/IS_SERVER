const nodemailer = require("nodemailer");


module.exports.otp_sendEmail = async (req, res) => {
  var otp = req.body.otp;
  var user_mail = req.body.email

  let transporter = nodemailer.createTransport({
   
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, 
    service: "Gmail",
    auth: {
      user: process.env.USER, 
      pass: process.env.PASS, 
    },
  });

  
  let info = await transporter.sendMail({
    

    from: "projectkec2024@gmail.com",
    to: user_mail, 
    subject: "Kec Circular | OTP", 
    text: "KEC CIRCULAR", 
    html: `<p> Here the OTP for your verification => <b> ${otp} </b><p>`,
  });
  console.log("Message sent: %s", info.messageId);
 
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  info.messageId ? res.status(200).json('OTP Send Successfully') : res.status(500).json('Error Occured!')

}








