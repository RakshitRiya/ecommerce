const SProduct = require("../models/sliderproduct");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

//Create a product
exports.createsliderProduct = (req, res) => {
  const form = formidable.IncomingForm();
  form.keepExtension = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Bad request: Error occured while parsing file",
      });
    }

    //Destructuring fields
    const { name } = fields;

    //Making sure that each field is being provided while requesting to add the product
    if (!name) {
      return res.status(400).json({
     error: "Error: Please make sure no field is left empty",
   });
 }

    //Creating a product object
    let sproduct = new SProduct(fields);

    //Handle files here
    if (file.photo) {
      //file size only upto 3MB is allowed
      if (file.photo.size > 3145728) {
        return res.status(400).json({
          error: "Bad request: File size bigger than 3MB is not allowed",
        });
      }

      //Providing file path and extension details in photo object
      sproduct.photo.data = fs.readFileSync(file.photo.path);
      sproduct.photo.contentType = file.photo.type;
    }

    //Save product to DB
    sproduct.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Bad request: Error occured while saving product to DB",
        });
      }
      res.json(sproduct);
    });
  });
};

// //Middleware to get product by Id and save it to req.product object
exports.getSliderProductById = (req, res, next, id) => {
  SProduct.findById(id).exec((err, product) => {
    if (err) {
      return res.status(400).json({
        error: "Bad request: Error occured while finding product",
      });
    }
    if (!product) {
      return res.status(404).json({
        error: "Not found: product not found",
      });
    }
    req.sliderproduct = product;
    next();
  });
};

// //Send a product(found by getSliderProductById) as a response
exports.getSliderProduct = (req, res) => {
  req.sliderproduct.photo = undefined;
  return res.json(req.sliderproduct);
};

// //Get all product
exports.getAllSliderProduct = (req, res) => {
  //ternary operator used here to check for user input for "limit" which will be treated as string by default
  //Parsing the string value (limit) to integer number is done by parseInt(string)
  let limit = req.query.limit ? parseInt(req.query.limit) : 4;
  let skip = req.query.skip ? parseInt(req.query.skip) : 0;

  //check for user input for "sortBy" & "ascDesc" which will be treated as string by default
  let sortBy = req.query.sortBy ? req.query.sortBy : "name";
  let ascDesc = req.query.ascDesc ? req.query.ascDesc : "asc";
  SProduct.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, ascDesc]])
    .limit(limit)
    .skip(skip)
    .exec((err, allProducts) => {
      if (err) {
        return res.status(400).json({
          error:
            "Bad request: Error occurred while getting all products from the DB",
        });
      }
      if (!allProducts) {
        return res.status(404).json({
          error: "Not found: No products found on the DB",
        });
      }
      res.json(allProducts);
    });
};

// //Middleware for getting photo
exports.getSliderPhoto = (req, res, next) => {
  if (req.sliderproduct.photo.data) {
    res.set("content-type", req.sliderproduct.photo.contentType);
    res.send(req.sliderproduct.photo.data);
  }
  next();
};

// //Delete controller
exports.deleteSliderProduct = (req, res) => {
  let product = req.sliderproduct;
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
}