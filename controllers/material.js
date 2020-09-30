const Material= require("../models/material");

//Create category
exports.createMaterial = (req, res) => {
	const material = new Material(req.body);
	material.save((err, size) => {
		if (err) {
			return res.status(400).json({
				error: "Bad request: Error occured while saving category to DB",
			});
		}
		res.json(size);
	});
};

//Middleware | Get category by ID and store them in req.category object
exports.getMaterialById = (req, res, next, id) => {
	Material.findById(id).exec((err, material) => {
		if (err) {
			return res.status(400).json({
				error: "Bad request: Error occured while finding category",
			});
		}
		if (!material) {
			return res.status(404).json({
				error: "Not found: Category not found",
			});
		}
		req.material = material;
		next();
	});
};

//Get one category
exports.getMaterial = (req, res) => {
	res.json(req.size);
};

//Get all categories
exports.getAllMaterial = (req, res) => {
	Material.find().exec((err, allMaterials) => {
		if (err) {
			return res.status(400).json({
				error:
					"Bad request: Error occured while getting all categories from DB",
			});
		}
		if (!allMaterials) {
			return res.status(404).json({
				error: "Not found: No categories were found on the DB",
			});
		}
		res.json(allMaterials);
	});
};



exports.removeMaterial = (req, res) => {
	const material = req.material;
	material.remove((err, removedMaterial) => {
		if (err) {
			return res.status(400).json({
				error: "Bad request: Error occured while deleting category in DB",
			});
		}
		res.json({
			message: ` \'${removedMaterial.name}\' category was deleted successfully from the DB`,
		});
	});
};
