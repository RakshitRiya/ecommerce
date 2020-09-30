const express = require("express");
const router = express.Router();
const {
    createMaterial,
    getMaterialById,
    getMaterial,
    getAllMaterial,
    removeMaterial
} = require("../controllers/material");

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//Param middleware
router.param("userId", getUserById);
router.param("materialId", getMaterialById);

//Create category route
router.post(
	"/material/create/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	createMaterial
);

//Get category routes
router.get("/material/:materialId", getMaterial);
router.get("/materials", getAllMaterial);

//Delete category routes
router.delete(
	"/material/:materialId/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	removeMaterial
);

//exporting all routes to express.Router()
module.exports = router;