const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Schema;

const sliderproductSchema = new mongoose.Schema(
  {
    name: {
    type: String,
    trim: true,
    maxlength: 32,
    required: true,
   },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SliderProduct", sliderproductSchema);