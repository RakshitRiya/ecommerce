const CustomProduct = require("../models/customproduct");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

//Create a product
exports.createCustomProduct = (req, res) => {
  const form = formidable.IncomingForm();
  form.keepExtension = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Bad request: Error occured while parsing file",
      });
    }

    //Destructuring fields
    const { name, email, mobno, size, material, category } = fields;

    //Making sure that each field is being provided while requesting to add the product
    if (!name || !email || !mobno || !size || !category || !material) {
      return res.status(400).json({
        error: "Error: Please make sure no field is left empty",
      });
    }

    //Creating a product object
    let customproduct = new CustomProduct(fields);

    //Handle files here
    if (file.photo) {
      //file size only upto 3MB is allowed
      if (file.photo.size > 3145728) {
        return res.status(400).json({
          error: "Bad request: File size bigger than 3MB is not allowed",
        });
      }

      //Providing file path and extension details in photo object
      customproduct.photo.data = fs.readFileSync(file.photo.path);
      customproduct.photo.contentType = file.photo.type;
    }

    //Save product to DB
    customproduct.save((err, customproduct) => {
      if (err) {
        return res.status(400).json({
          error: "Bad request: Error occured while saving product to DB",
        });
      }
      res.json(customproduct);
    });
  });
};

//Middleware to get product by Id and save it to req.product object
exports.getCustomProductById = (req, res, next, id) => {
  CustomProduct.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (!product) {
        return res.status(404).json({
          error: "Not found: product not found",
        });
      }
      req.customproduct = product;
      next();
    });
};

//Send a product(found by getProductById) as a response
exports.getCustomProduct = (req, res) => {
  //TODO:HERE ohoto != undefined
  req.customproduct.photo = undefined;
  return res.json(req.customproduct);
};

//Get all product
exports.getAllCustomProduct = (req, res) => {
  //ternary operator used here to check for user input for "limit" which will be treated as string by default
  //Parsing the string value (limit) to integer number is done by parseInt(string)
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let skip = req.query.skip ? parseInt(req.query.skip) : 0;

  //check for user input for "sortBy" & "ascDesc" which will be treated as string by default
  let sortBy = req.query.sortBy ? req.query.sortBy : "name";
  let ascDesc = req.query.ascDesc ? req.query.ascDesc : "asc";
  CustomProduct.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, ascDesc]])
    .limit(limit)
    .skip(skip)
    .exec((err, allCustomProducts) => {
      if (err) {
        return res.status(400).json({
          error:
            "Bad request: Error occurred while getting all products from the DB",
        });
      }
      if (!allCustomProducts) {
        return res.status(404).json({
          error: "Not found: No products found on the DB",
        });
      }
      res.json(allCustomProducts);
    });
};

//Middleware for getting photo
exports.getCustomPhoto = (req, res, next) => {
  if (req.customproduct.photo.data) {
    res.set("content-type", req.customproduct.photo.contentType);
    res.send(req.customproduct.photo.data);
  }
  next();
};

//Delete controller
exports.deleteCustomProduct = (req, res) => {
  let product = req.customproduct;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: `Bad request: Error occured while deleting the porduct: ${deletedProduct.name}`,
      });
    }
    return res.json({
      message: `\"${deletedProduct.name}\" has been deleted from database successfully`,
    });
  });
};
