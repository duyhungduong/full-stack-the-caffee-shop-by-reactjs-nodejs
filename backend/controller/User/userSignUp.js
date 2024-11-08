const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

// Store hash in your password DB.

async function userSignUpController(req, res) {
  try {
    const { email, name, phone, address, password } = req.body;

    const user = await userModel.findOne({ email });

    console.log("user SignUp", user);

    if (user) {
      throw new Error("Already user exits.");
    }

    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }
    if (!name) {
      throw new Error("Please provide name");
    }
    // if (!phone) {
    //   throw new Error("Please provide phone");
    // }
    // if (!address) {
    //   throw new Error("Please provide address");
    // }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something is wrong");
    }
    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword,
    };
    const userData = new userModel(payload);
    const saveUser = await userData.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User created successfully",
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
