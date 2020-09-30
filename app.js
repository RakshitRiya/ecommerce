require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const sliderproductRoutes = require("./routes/sliderproduct");
const orderRoutes = require("./routes/order");
const sizeRoutes = require("./routes/size");
const materialRoutes = require("./routes/material");
const stripeRoutes = require("./routes/stripePayment");
const paypalRoutes = require("./routes/paypalPayment");
const razorpayRoutes = require("./routes/razorpayPayment");
const customProductRoutes = require("./routes/customproduct");

//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("!!--------DB CONNECTED!-------!!");
  });

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes middlewares
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", sliderproductRoutes);
app.use("/api", sizeRoutes);
app.use("/api", materialRoutes);
app.use("/api", orderRoutes);
app.use("/api", stripeRoutes);
app.use("/api", paypalRoutes);
app.use("/api", razorpayRoutes);
app.use("/api", customProductRoutes);

//PORT
const port = process.env.PORT || 8000;

//Creating a server
app.listen(port, (req, res) => {
  console.log(`>> App is running at ${port}`);
});
