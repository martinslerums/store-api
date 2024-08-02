import Product from "../models/productSchema.js";

//For testing purposes with Static data ( hard-coded )
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $gt: 30 } })
    .sort("price")
    .select("name price");

  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, type, name, sort, fields, numericFilters } = req.query;

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

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
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

      if(options.includes(field)) {
        queryObject[field] = {[operator]: Number(value)}
      }
    });
  }

  console.log("queryObject: ", queryObject);

  let result = Product.find(queryObject);
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

  res.status(200).json({ products, nbHits: products.length });
};

export { getAllProducts, getAllProductsStatic };
