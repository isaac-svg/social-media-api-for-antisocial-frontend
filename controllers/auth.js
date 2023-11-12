import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { omit } from "../lib/object.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password:pass } = req.body;
    const dbuser = await User.findOne({ email: email });
    if (!dbuser) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(pass, dbuser.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: dbuser._id }, process.env.JWT_SECRET);

    const {password,__v, ...user} = dbuser;
    res.status(200).json({ token, user:omit(user._doc, ["password"]) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
