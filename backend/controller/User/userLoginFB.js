const express = require("express");
const axios = require("axios");
const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");

const userLoginFBController = async (req, res) => {
  const { accessToken } = req.body;

  try {
    // Use Facebook's Graph API to verify and get user info
    const fbUserData = await axios.get(
      `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`
    );

    const { id: facebookId, name, email, picture } = fbUserData.data;

    // Check if user exists in your database
    let user = await User.findOne({ email });

    if (!user) {
      //     {
      //   // Update user with Facebook ID if not present
      //   //   if (!user.facebookId) {
      //   //     user.facebookId = facebookId;
      //   //     await user.save();
      //   //   }
      //   const jwtToken = await jwt.sign(
      //     { _id: user._id, email: user.email },
      //     process.env.TOKEN_SECRET_KEY,
      //     { expiresIn: "8h" }
      //   );

      //   res.cookie("token", jwtToken, {
      //     httpOnly: true,
      //     secure: true,
      //     sameSite: "None",
      //   });

      //   return res.status(200).json({
      //     message: "Login successful",
      //     user,
      //     success: true,
      //     data: jwtToken,
      //     error: false,
      //   });
      // } else
      // Create a new user
      user = new User({
        // facebookId,
        email,
        name,
        profilePic: picture?.data?.url,
        role: "GENERAL",
        address: "",
        phone: "",
      });
      await user.save();
    }
    const jwtToken = await jwt.sign(
      { _id: user._id, email: user.email },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "8h" }
    );

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    });

    return res.status(200).json({
      message: "Login with Facebook Successful",
      user,
      success: true,
      data: jwtToken,
      error: false,
    });
  } catch (error) {
    console.error("Facebook authentication error:", error);
    res.status(401).json({ message: "Facebook authentication failed" });
  }
};
module.exports = userLoginFBController;
