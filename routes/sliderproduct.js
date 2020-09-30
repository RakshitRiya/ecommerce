const express = require("express");
const router = express.Router();

const {
  createsliderProduct,
  getSliderProductById,
  getSliderProduct,
  getAllSliderProduct,
  getSliderPhoto,
  deleteSliderProduct,
  //   updateProduct,
} = require("../controllers/sliderproduct");
const { getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

//Routes for params
router.param("userId", getUserById);
router.param("sliderProductId", getSliderProductById);

//Actual Routes
//Create route
router.post(
  "/sliderproduct/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createsliderProduct
);

// //Read routes
router.get("/sliderproducts", getAllSliderProduct);
router.get("/sliderproduct/:sliderProductId", getSliderProduct);
router.get("/sliderproduct/photo/:sliderProductId", getSliderPhoto);

// Delete route
router.delete(
  "/sliderproduct/:sliderProductId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteSliderProduct
);

module.exports = router;