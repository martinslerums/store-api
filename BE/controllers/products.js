import Sofa from "../models/sofaSchema.js";
import Chair from "../models/chairSchema.js";
import mongoose from "mongoose";

//For testing purposes with Static data ( hard-coded )
const getAllProductsStatic = async (req, res) => {
  const uniqueCompanies = await Sofa.distinct("company");
  const uniqueColors = await Sofa.distinct("color");

  const filterValues = {
    uniqueCompanies,
    uniqueColors,
  };

  res.status(200).json(filterValues);
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

  const { company, type, material, color, sort, fields, numericFilters } =
    req.query;

  const queryObject = {};

  if (company) {
    queryObject.company = company;
  }

  if (type) {
    queryObject.type = type;
  }

  if (material) {
    queryObject.material = material;
  }

  if (color) {
    queryObject.color = color;
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
