const express = require("express");
const router = express.Router();
const upload = require("../config/multer.config");
const fileModel = require("../models/files.model");
const authMiddleware = require("../middlewares/auth");
const supabase = require("../supabaseClient");
const { v4: uuidv4 } = require("uuid");

router.get("/home",  (req, res) => {
  console.log("from file home");
  res.render("home");
});

router.post("/upload", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded." });

    const userId = req.user.userId;
    const uniqueName = `${userId}/${Date.now()}-${uuidv4()}-${req.file.originalname}`;

    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(uniqueName, req.file.buffer, {
        contentType: req.file.mimetype,
      });

    if (error) throw new Error(error.message);

    const { publicUrl } = supabase
      .storage
      .from("uploads")
      .getPublicUrl(uniqueName).data;

    const fileDoc = await fileModel.create({
      user: userId,
      originalname: req.file.originalname,
      supabasePath: uniqueName,
      url: publicUrl,
    });

    res.status(200).json(fileDoc);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
