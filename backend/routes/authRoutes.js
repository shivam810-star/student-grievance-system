const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await Student.findOne({ email });
    if (user) return res.status(400).json({ msg: "Email exists" });

    const hashed = await bcrypt.hash(password, 10);

    user = new Student({ name, email, password: hashed });
    await user.save();

    res.json({ msg: "Registered" });
  } catch (err) {
    res.status(500).send("Error");
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Student.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ token });
  } catch {
    res.status(500).send("Error");
  }
});

module.exports = router;