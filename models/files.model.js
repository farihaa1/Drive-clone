const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  path: {
    type: String,
    
  },
  originalname: {
    type: String,
    required: [true, "Original name is required"],
  },
  supabaseUrl: {
    type: String,
    required: true,
  },
 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "user is required"],
  },
});

const file = mongoose.model("file", fileSchema);
module.exports = file;
