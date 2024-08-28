import Sofa from "../models/sofaSchema.js";
import Chair from "../models/chairSchema.js";
import mongoose from "mongoose";

//For testing purposes with Static data ( hard-coded )
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $gt: 30 } })
    .sort("price")
    .select("name price");

  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {

  const { name } = req.query;

  const queryObject = {};

  if (name) {
    queryObject.name = { $regex: name, $options: "i" }; 
  } else {
    queryObject.featured = true; 
  }

  const [sofas, chairs] = await Promise.all([
    Sofa.find(queryObject).lean(),
    Chair.find(queryObject).lean(),
  ]);

  res.status(200).json({
    success: true,
    products: { sofas, chairs },
    nbHits: {
      sofas: sofas.length,
      chairs: chairs.length,
    },
  });
};

const getWishlistProducts = async (req, res) => {
  const { productIds } = req.body;

  if (
    !Array.isArray(productIds) ||
    productIds.some((id) => !mongoose.Types.ObjectId.isValid(id))
  ) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid productIds" });
  }

  if (productIds.length > 100) {
    return res
      .status(400)
      .json({ success: false, error: "Too many productIds" });
  }

  const [sofas, chairs] = await Promise.all([
    Sofa.find({ _id: { $in: productIds } }).lean(),
    Chair.find({ _id: { $in: productIds } }).lean(),
  ]);

  const products = [...sofas, ...chairs];

  console.log(`Product IDs requested: ${productIds.join(", ")}`);

  res.status(200).json({
    success: true,
    data: { products, nbHits: products.length },
  });
};

const getAllSofas = async (req, res) => {
  const { featured, company, type, sort, fields, numericFilters } =
    req.query;

  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (type) {
    queryObject.type = type;
  }


  if (numericFilters) {
    const operatorMap = {
      "<=": "$lte",
      "<": "$lt",
      "=": "$eq",
      ">": "$gt",
      ">=": "$gte",
    };

    const regEx = /(<=|>=|<|>|=)/g;

    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");

      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  console.log("queryObject in Sofas Controller: ", queryObject);

  let result = Sofa.find(queryObject);
  /* SORTING */
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  /* FIELDS ( SELECT ) */
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  /* LIMIT (products returns) SKIP (skips products for pagination) */
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 100;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;

  res.status(200).json({
    success: true,
    products: products,
    nbHits: products.length,
  });
};

const getAllChairs = async (req, res) => {
  const { featured, company, type, sort, fields, numericFilters } =
    req.query;

  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (type) {
    queryObject.type = type;
  }

 
  if (numericFilters) {
    const operatorMap = {
      "<=": "$lte",
      "<": "$lt",
      "=": "$eq",
      ">": "$gt",
      ">=": "$gte",
    };

    const regEx = /(<=|>=|<|>|=)/g;

    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");

      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  console.log("queryObject in Chair Controller: ", queryObject);

  let result = Chair.find(queryObject);
  /* SORTING */
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  /* FIELDS ( SELECT ) */
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  /* LIMIT (products returns) SKIP (skips products for pagination) */
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 100;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;

  res.status(200).json({
    success: true,
    products: products,
    nbHits: products.length,
  });
};

export {
  getAllProductsStatic,
  getAllProducts,
  getWishlistProducts,
  getAllSofas,
  getAllChairs,
};
