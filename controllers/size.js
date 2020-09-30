const Size= require("../models/size");

//Create category
exports.createSize = (req, res) => {
	const size = new Size(req.body);
	size.save((err, size) => {
		if (err) {
			return res.status(400).json({
				error: "Bad request: Error occured while saving category to DB",
			});
		}
		res.json(size);
	});
};

//Middleware | Get category by ID and store them in req.category object
exports.getSizeById = (req, res, next, id) => {
	Size.findById(id).exec((err, size) => {
		if (err) {
			return res.status(400).json({
				error: "Bad request: Error occured while finding category",
			});
		}
		if (!size) {
			return res.status(404).json({
				error: "Not found: Category not found",
			});
		}
		req.size = size;
		next();
	});
};

//Get one category
exports.getSize = (req, res) => {
	res.json(req.size);
};

//Get all categories
exports.getAllSize = (req, res) => {
	Size.find().exec((err, allSizes) => {
		if (err) {
			return res.status(400).json({
				error:
					"Bad request: Error occured while getting all categories from DB",
			});
		}
		if (!allSizes) {
			return res.status(404).json({
				error: "Not found: No categories were found on the DB",
			});
		}
		res.json(allSizes);
	});
};



exports.removeSize = (req, res) => {
	const size = req.size;
	size.remove((err, removedSize) => {
		if (err) {
			return res.status(400).json({
				error: "Bad request: Error occured while deleting category in DB",
			});
		}
		res.json({
			message: ` \'${removedSize.name}\' category was deleted successfully from the DB`,
		});
	});
};
