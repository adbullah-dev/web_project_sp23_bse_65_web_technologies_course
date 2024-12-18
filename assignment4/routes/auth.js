import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const AuthRouter = express.Router();

// Render login and register pages
AuthRouter.route("/login").get((req, res) => {
  console.log("Rendering login page...");
  res.render("auth/login");
});

AuthRouter.route("/register").get((req, res) => {
  console.log("Rendering registration page...");
  res.render("auth/register");
});

// Handle login
AuthRouter.route("/login").post(async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`Login attempt for email: ${email}`);

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      console.log("Login failed: User not found.");
      req.flash("error", "User not found!");
      return res.redirect("/login");
    }

    // Compare the provided password with the hashed one
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      console.log("Login failed: Incorrect password.");
      req.flash("error", "Incorrect password!");
      return res.redirect("/login");
    }

    // Set session data
    req.session.user = {
      id: user._id,
      username: user.username,
    };

    console.log(`Login successful for user: ${user.username}`);
    req.flash("success", `Welcome back, ${user.username}!`);
    return res.redirect("/");
  } catch (error) {
    console.error("Error during login process:", error);
    req.flash("error", "Something went wrong!");
    res.redirect("/login");
  }
});

// Handle registration
AuthRouter.route("/register").post(async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(`Registration attempt for email: ${email}`);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Registration failed: Email already registered.");
      req.flash("error", "Email is already registered!");
      return res.redirect("/register");
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    console.log(`User registered successfully: ${username}`);
    req.flash("success", "Registration successful! Please log in.");
    return res.redirect("/login");
  } catch (error) {
    console.error("Error during registration process:", error);
    req.flash("error", "Registration failed. Try again!");
    res.redirect("/register");
  }
});

export default AuthRouter;
