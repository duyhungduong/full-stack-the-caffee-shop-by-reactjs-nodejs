// src/helpers/emailHelper.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendBookingConfirmationEmail(
  userEmail,
  userName,
  tableImage,
  bookingDetails
) {
  const googleMapsLink = "https://maps.app.goo.gl/ci6RxCSAzKcRQGtS6"; // Google Maps link
  const mapEmbedUrl =
    "https://www.google.com/maps/embed/v1/place?q=10.762622,106.660172&zoom=15&key=YOUR_GOOGLE_MAPS_API_KEY"; // Replace with actual API key
  const tableImageUrl = tableImage; // Pass table image URL as part of booking details

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Booking Confirmation",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; padding: 20px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #444; text-align: center;">Booking Confirmation</h2>
        <p style="font-size: 16px; text-align: center;">Hello <strong>${userName}</strong>,</p>
        <p style="font-size: 16px; text-align: center;">Your booking has been confirmed! Here are the details:</p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px; border-radius: 8px; overflow: hidden;">
            <tr style="background-color: #f0f0f0;">
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; width: 40%;">Arrival</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${bookingDetails.arrivalTime}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">End</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${bookingDetails.endTime}</td>
            </tr>
            <tr style="background-color: #f0f0f0;">
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Table</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${bookingDetails.tableInfo}</td>
            </tr>
        </table>

        <h3 style="color: #444; margin-top: 20px; text-align: center;">Table Image</h3>
        <img src="${tableImageUrl}" alt="Table Image" style="width: 100%; max-width: 500px; margin: 10px auto; display: block; border-radius: 10px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">

        <h3 style="color: #444; margin-top: 20px; text-align: center;">Restaurant Location</h3>
        <div style="width: 100%; max-width: 500px; margin: 10px auto; display: block; border-radius: 10px; overflow: hidden; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
          <iframe
            src="${mapEmbedUrl}"
            width="100%"
            height="300"
            style="border:0; border-radius: 10px;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>

        <p style="margin-top: 20px; text-align: center; font-size: 16px;">Thank you for choosing us! We look forward to serving you.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendBookingConfirmationEmail };
