const express = require("express");
const router = express.Router();

const {
  getCustomProductById,
  createCustomProduct,
  getAllCustomProduct,
  getCustomProduct,
  getCustomPhoto,
  deleteCustomProduct,
} = require("../controllers/customproduct");
const { getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
//
//Routes for params
router.param("userId", getUserById);
router.param("customProductId", getCustomProductById);

//Actual Routes
//Create route
router.post("/customproduct/create", createCustomProduct);

//Read routes
router.get(
  "/customproducts/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllCustomProduct
);
router.get("/customproduct/:customProductId", getCustomProduct);

router.get("/customproduct/photo/:customProductId", getCustomPhoto);

// Delete route
router.delete(
  "/customproduct/:customProductId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteCustomProduct
);

module.exports = router;
