import Sofa from "../models/sofaSchema.js";
import Chair from "../models/chairSchema.js";
import mongoose from "mongoose";

//For testing purposes with Static data ( hard-coded )
const getAllProductsStatic = async (req, res) => {
  const products = await Sofa.find({ price: { $gte: 500, $lte: 1000 } }).select(
    "name price"
  );

  res.status(200).json({
    success: true,
    products: products,
    nbHits: products.length,
  });
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

const getFilteredProducts = async (req, res) => {
  const isSofaRoute = req.path.includes("sofas");
  const isChairRoute = req.path.includes("chairs");

  let collection;

  if (isSofaRoute) {
    collection = Sofa;
  } else if (isChairRoute) {
    collection = Chair;
  } else {
    return res.status(400).json({ message: "Invalid route" });
  }

  const { company, type, material, color, sort, fields, price } = req.query;

  const queryObject = {};

  if (company) {
    const companyArray = company.split(",");
    queryObject.company = { $in: companyArray };
  }

  if (type) {
    const typeArray = type.split(",");
    queryObject.type = { $in: typeArray };
  }

  if (material) {
    const materialArray = material.split(",");
    queryObject.material = { $in: materialArray };
  }

  if (color) {
    const colorArray = color.split(",");
    queryObject.color = { $in: colorArray };
  }

  if (price) {
    const operatorMap = {
      lte: "$lte",
      eq: "$eq",
      gte: "$gte",
    };

    const regEx = /(lte|eq|gte)/g;

    let filters = price.replace(regEx, (match) => `${operatorMap[match]}`);

    filters.split(",").forEach((item) => {
      const [operator, value] = item.split("-");

      if (operator && value) {
        queryObject.price = queryObject.price || {};
        queryObject.price[operator] = Number(value);
      }
    });
  }

  console.log("queryObject in FilteredProducts Controller: ", queryObject);

  let result = collection.find(queryObject);
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

const getFilters = async (req, res) => {
  const isSofaRoute = req.path.includes("sofas");
  const isChairRoute = req.path.includes("chairs");

  let collection;

  if (isSofaRoute) {
    collection = Sofa;
  } else if (isChairRoute) {
    collection = Chair;
  } else {
    return res.status(400).json({ message: "Invalid route" });
  }

  const [uniqueCompanies, uniqueColors, uniqueMaterials, uniqueTypes] =
    await Promise.all([
      collection.distinct("company"),
      collection.distinct("color"),
      collection.distinct("material"),
      collection.distinct("type"),
    ]);

  const filterValues = {
    uniqueCompanies,
    uniqueColors,
    uniqueMaterials,
    uniqueTypes,
  };

  res.status(200).json(filterValues);
};

export {
  getAllProductsStatic,
  getAllProducts,
  getWishlistProducts,
  getFilteredProducts,
  getFilters,
};
