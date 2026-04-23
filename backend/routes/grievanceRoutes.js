const express = require("express");
const Grievance = require("../models/Grievance");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Create
router.post("/", auth, async (req, res) => {
  const grievance = new Grievance({
    ...req.body,
    student: req.user.id,
  });

  await grievance.save();
  res.json(grievance);
});

// Get All
router.get("/", auth, async (req, res) => {
  const data = await Grievance.find({ student: req.user.id });
  res.json(data);
});

// Get By ID
router.get("/:id", auth, async (req, res) => {
  const g = await Grievance.findById(req.params.id);
  res.json(g);
});

// Update
router.put("/:id", auth, async (req, res) => {
  const g = await Grievance.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(g);
});

// Delete
router.delete("/:id", auth, async (req, res) => {
  await Grievance.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

// Search
router.get("/search/title", auth, async (req, res) => {
  const { title } = req.query;
  const data = await Grievance.find({
    title: { $regex: title, $options: "i" },
  });
  res.json(data);
});

module.exports = router;