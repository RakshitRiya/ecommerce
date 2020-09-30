const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const customProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 32,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      maxlength: 2000,
      required: true,
    },
    mobno: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    size: {
      type: String,
      trim: true,
      required: true,
    },
    material: {
      type: String,
      trim: true,
      required: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CustomProduct", customProductSchema);
