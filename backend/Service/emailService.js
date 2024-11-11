// src/services/emailService.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'Gmail', // Example using Gmail, configure as needed
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendBookingConfirmationEmail = async (userEmail, userName, bookingDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Welcom my Caffee Shop - Booking Confirmation",
    text: `Hello ${userName},\n\nYour booking is confirmed!\n\nDetails:\nArrival: ${bookingDetails.arrivalTime}\nEnd: ${bookingDetails.endTime}\nTable: ${bookingDetails.tableInfo}\n\nThank you for choosing us!`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendBookingConfirmationEmail };
