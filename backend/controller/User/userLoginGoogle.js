const { OAuth2Client } = require("google-auth-library");
const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const userLoginGoogleController = async (req, res, next) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, picture } = ticket.getPayload();

    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({ email, name, profilePic: picture, role: "GENERAL" , address: "", phone: ""});
    }

    const jwtToken = await jwt.sign(
      { _id: user._id, email: user.email },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "8h" }
    );

    res.cookie("token", jwtToken, { httpOnly: true, secure: true, sameSite: "None" });

    return res.status(200).json({
      message: "Google login successful",
      success: true,
      data: jwtToken,
      error: false,
    });
  } catch (error) {
    console.error("Error in Google Login:", error);
    next(error);  // Pass the error to Express error handler
  }
};

module.exports = userLoginGoogleController;