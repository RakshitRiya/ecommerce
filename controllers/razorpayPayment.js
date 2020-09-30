const shortid = require("shortid");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

exports.verifyPayment = (req, res) => {
  // do a validation
  const secret = "12345678";
  //   console.log("Body " + JSON.stringify(req.body));

  const crypto = require("crypto");

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  //   console.log(digest, req.headers["x-razorpay-signature"]);
  if (digest === req.headers["x-razorpay-signature"]) {
    // console.log("request is legit");
    // process it
    // console.log(JSON.stringify(req.body));
    // require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
  } else {
    // pass it
  }
  res.json({ status: "ok" });
};

exports.paymentRazorPay = async (req, res) => {
  const payment_capture = 1;

  const products = req.body.cartproducts;
  let amount = 0;
  let tamount = 0;
  products.map((p) => {
    tamount += p.price * p.quantity;
  });
 amount = (tamount+500)*0.18 + (tamount+500);


  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    // console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
};