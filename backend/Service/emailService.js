// src/helpers/emailHelper.js
const nodemailer = require("nodemailer");
const path = require("path");

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
  const googleMapsLink = "https://goo.gl/maps/Q2HMYoXvM3fKqHvGA"; // Link đến Google Maps
  const caffeeShopLink =
    "https://full-stack-the-caffee-shop-by-reactjs-nodejs-dizi.vercel.app/";
  const mapStaticImageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=10.776899,106.700806&zoom=16&size=600x300&markers=color:red%7C10.776899,106.700806&key=YOUR_GOOGLE_MAPS_API_KEY
`; // Đảm bảo bạn thay thế bằng API Key của bạn
  const tableImageUrl = tableImage;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Booking Confirmation",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; padding: 20px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
      <a href="${caffeeShopLink}" target="_blank" style="display: block; text-align: center;">
          <img src="cid:caffeeLink" alt="Caffee Link" style="width: 100%; max-width: 500px; border-radius: 10px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); margin-top: 10px;" />
        </a>  
      <h2 style="color: #444; text-align: center;">Booking Confirmation</h2>
        <p style="font-size: 16px; text-align: center;">Hello <strong>${userName}</strong>,</p>
        <p style="font-size: 16px; text-align: center;">Your booking has been confirmed! Here are the details:</p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background-color: #f0f0f0;">
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Arrival</td>
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
        <img src="${tableImageUrl}" alt="Table Image" style="width: 100%; max-width: 500px; margin: 10px auto; display: block; border-radius: 10px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);" />

        <h3 style="color: #444; margin-top: 20px; text-align: center;">Caffee Shop - Location</h3>
        <p style="font-size: 16px; text-align: center;">Address: <strong> Khu II, 3 Thang 2 Street, Xuan Khanh , Ninh Kieu, Can Tho, Viet Nam</strong></p>
        <a href="${googleMapsLink}" target="_blank" style="display: block; text-align: center;">
          <img src="cid:locationMap" alt="Google Map" style="width: 100%; max-width: 500px; border-radius: 10px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); margin-top: 10px;" />
        </a>

        <p style="margin-top: 20px; text-align: center; font-size: 16px;">Thank you for choosing us! We look forward to serving you.</p>
      </div>
    `,
    attachments: [
      {
        filename: "map.png", // Rename as needed
        path: path.resolve(__dirname, "../assets/googlemaps.png"), // Path to the map image
        cid: "locationMap", // Content ID for inline embedding
      },
      {
        filename: "caffee.png", // Rename as needed
        path: path.resolve(__dirname, "../assets/logocaffee.png"), // Path to the map image
        cid: "caffeeLink", // Content ID for inline embedding
      },
    ],
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendBookingConfirmationEmail };
