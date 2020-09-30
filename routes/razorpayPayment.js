const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { verifyPayment, paymentRazorPay } = require("../controllers/razorpayPayment");

router.param("userId", getUserById);

router.post("/verification", verifyPayment);

router.post("/razorpay/:userId", isSignedIn, isAuthenticated, paymentRazorPay);

module.exports = router;