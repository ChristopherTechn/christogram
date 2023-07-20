const { createTransport } = require("nodemailer");
require('dotenv').config();
const email_config = require('../config/email');


const transporter = createTransport(email_config);

async function sendMail(user_Email, subject, text) {
  const confirmationLink = "https://samrexenterprises.co.ke/confirm-email";
  const imageUrl = "https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW5zdGFncmFtJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60";



  const message_options = {
    from: process.env.EMAIL_USER,
    to: user_Email,
    subject: subject,
  
    html: `
      <p>${text}</p>
      <p>Click <a href="${confirmationLink}">here</a> to confirm your email.</p>
      <img src="${imageUrl}" alt="Welcome Image" />
    `
  };

 


  try {
    let results = await transporter.sendMail(message_options);
    console.log(results);
  } catch (error) {
    console.log(error);
  }
}

module.exports = sendMail;
