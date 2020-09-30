const express = require("express");
const router = express.Router();

const {
	createProduct,
	getProductById,
	getProductByCategory,
	getProductByMaterial,
	getProductBySize,
	getProduct,
	getAllProduct,
	getPhoto,
	deleteProduct,
	updateProduct,
	getAllProductHp
} = require("../controllers/product");
const { getUserById } = require("../controllers/user");
const { getCategoryById }= require("../controllers/category");
const { getMaterialById } = require("../controllers/material");
const { getSizeById } = require("../controllers/size");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

//Routes for params
router.param("userId", getUserById);
router.param("productId", getProductById);
router.param("categoryId", getCategoryById);
router.param("materialId", getMaterialById);
router.param("sizeId", getSizeById);

//Actual Routes
//Create route
router.post(
	"/product/create/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	createProduct
);

//Read routes
router.get("/products", getAllProduct);
router.get("/home/products", getAllProductHp);
router.get("/product/:productId", getProduct);
router.get("/products/:categoryId", getProductByCategory);
router.get("/productm/:materialId", getProductByMaterial );
router.get("/productsz/:sizeId", getProductBySize);
router.get("/product/photo/:productId", getPhoto);

//Delete route
router.delete(
	"/product/:productId/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	deleteProduct
);

//Update route
router.put(
	"/product/:productId/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	updateProduct
);

//Listing route

module.exports = router;
