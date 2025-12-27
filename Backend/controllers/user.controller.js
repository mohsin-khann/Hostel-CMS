
// geting All users

// import { User } from '../models/user.model';
import { User } from "../models/user.model.js";
import { OTP } from "../models/otp.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { decrypt } from "../utiles/cipher.js";

//signup
const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      address,
      otp,
    } = req.body;
    console.log("email", email);
    //validate
    if (
      !firstName ||
      !address ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "Please fill all the field.",
      });
    }


    //check passwords
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    //check user with the same email in db
    const user = await User.findOne({ email });
    console.log("user", user);
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User with the same email exists.",
      });
    }

    // retrieve most recent otp from db
    const recentOtp = await OTP.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log("recentOtp", recentOtp);
    if (!recentOtp) {
      return res.status(400).json({
        success: false,
        message: "OTP not found.",
      });
    }
    // Decrypt the stored OTP
    const decryptedOtp = decrypt({
      iv: recentOtp.otpIv,
      encryptedData: recentOtp.otp,
    });
    console.log("decryptedOtp", decryptedOtp);

    // Compare the decrypted OTP with the user-entered OTP
    if (otp !== decryptedOtp) {
      return res.status(400).json({
        success: false,
        message: "invalid OTP.",
      });
    }

    // hash password

    const hashpass = await bcrypt.hash(password, 10);
    console.log("hashpass", hashpass);

    const savePass = await User.create({
      firstName,
      lastName,
      email,
      password: hashpass,
      address,
      accountType,
    });
    console.log("savePass", savePass);
    res.status(200).json({
      success: true,
      message: "User registered successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User cannot be registered, Please try again.",
      error: error,
    });
  }
};

//login
const login = async (req, res) => {
  try {
    // take data from req body

    const { email, password } = req.body;
    // validate
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "Please fill all the field.",
      });
    }
    // check for the email if registered
    console.log(email)
    const registeredUser = await User.findOne({ email });
    if (!registeredUser) {
      const registeredUser = await User.find();
      console.log(registeredUser)

      return res.status(401).json({
        success: false,
        message: "User is not registered.",
      });
    }

    // generate jwt if the hashed pass is compared with user entered pass
    const matchPass = await bcrypt.compare(password, registeredUser.password);
    if (matchPass) {
      const payload = {
        userId: registeredUser._id,
        email: registeredUser.email,
        accountType: registeredUser.accountType,
      };
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "2h",
      });

      registeredUser.token = token;
      registeredUser.password = undefined; //cookie mai user snd krna hai is leye password ko hatana hoga
      // send token in cookie
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        registeredUser,
        token,
        message: "Loggin Successfully.",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid Password.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed. Please try again later.",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();

    res.status(200).json({
      success: true,
      message: "All users Fetched",
      allUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching complaints",
      error,
    });
  }
};

//geting single user data
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id",id);

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the user data
    res.status(200).json({ message: "User found", user });
  } catch (error) {
    console.error("Error occurred while finding user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//updating user by id
const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("User found and is ready to update");

    // Update user fields
    const { firstName, lastName, email, address } = req.body;
    const userSaved = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, email, address },
      { new: true, runValidators: true }
    );

    if (!userSaved) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User updated");

    res.status(200).json({ message: "User by id Updated", user: userSaved });
  } catch (err) {
    console.error("Error occurred updating user:", err);

    res.status(500).json({ message: "An error occurred", error: err.message });
  }
};

//updating user password
const updateUserPassword = async (req, res) => {
  try {
    const { id } = req.params || req.user.userId;
    // console.log("usr req ",req.user)
    // const id = req.user.userId;
    console.log("iddd",id)
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
      return res.status(400).json({ message: "Password is required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    console.log("Updating password for user:", await User.findById(id));

    const hashPass = await bcrypt.hash(password, 10);
    const updatePassword = await User.findByIdAndUpdate(
      id,
      { password: hashPass },
      { new: true, runValidators: true }
    );

    if (!updatePassword) {
      return res.status(404).json({ message: "User not found!" });
    }


    res.status(201).json({ message: "Password Updated", user: updatePassword });
  } catch (err) {
    console.error("Error Occurred Updating Password:", err);
    res.status(500).json({ message: "Error occurred while updating password" });
  }
};

//updating user account type (Admin only)
const updateUserAccountType = async (req, res) => {
  try {
    const { id } = req.params;
    const { accountType } = req.body;
    const { accountType: adminAccountType } = req.user;

    // Only Admin can update account types
    if (adminAccountType !== "Admin") {
      return res.status(403).json({ 
        success: false, 
        message: "Only Admin can update user account types." 
      });
    }

    // Validate account type
    const validAccountTypes = ["Ordinary", "Admin", "Agent", "Warden", "Employee", "DeputyProvost", "Provost"];
    if (!validAccountTypes.includes(accountType)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid account type." 
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { accountType },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found!" 
      });
    }

    res.status(200).json({ 
      success: true,
      message: "User account type updated successfully", 
      user: updatedUser 
    });
  } catch (err) {
    console.error("Error occurred updating user account type:", err);
    res.status(500).json({ 
      success: false,
      message: "Error occurred while updating user account type" 
    });
  }
};

//Deleting a single user
const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const user = await User.findByIdAndDelete({_id:id});
    console.log("user Deleted ", user);
    res.status(201).json("User deleted successfully");
  } catch (err) {
    console.log("Error occured deleting user", err);
    res.status(500).json({ message: "Error delteting user", err });
  }
};

export {
  signup,
  login,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  updateUserPassword,
  updateUserAccountType,
};

