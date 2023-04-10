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
 
  info.messageId ? res.status(200).json('OTP Send Successfully') : res.status(500).json('Error Occured!')

}


module.exports.sendMessage =async(email,message)=>{
 try {
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
      to: email, 
      subject: "Message from Insta Seva", 
      text: "Insta Seva", 
      html: `<p>${message}<p>`,
    });
    
   } catch (error) {
     
   }
    

}







