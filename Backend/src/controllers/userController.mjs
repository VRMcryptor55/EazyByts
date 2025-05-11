import User from "../models/User.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.status(201).json({ message: "User registered" });
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ message: "User not found" });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
};

// Update Username
export const updateUser = async (req, res) => {
    const { username } = req.body;
  
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      user.username = username;
      await user.save();
  
      res.json({ message: "Username updated", user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Upload Profile Photo
  export const uploadProfilePhoto = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      user.profilePhoto = req.file.path;
      await user.save();
  
      res.json({ message: "Profile photo updated", profilePhoto: user.profilePhoto });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // Get User Profile
export const getProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("username profilePhoto");
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // Get User by Username
export const getUserByUsername = async (req, res) => {
    const { username } = req.params;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ userId: user._id, username: user.username });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  };