const express = require("express");
const router = express.Router();
const {
    createSize,
    getSizeById,
    getSize,
    getAllSize,
    removeSize
} = require("../controllers/size");

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//Param middleware
router.param("userId", getUserById);
router.param("sizeId", getSizeById);

//Create category route
router.post(
	"/size/create/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	createSize
);

//Get category routes
router.get("/size/:sizeId", getSize);
router.get("/sizes", getAllSize);

//Delete category routes
router.delete(
	"/size/:sizeId/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	removeSize
);

//exporting all routes to express.Router()
module.exports = router;