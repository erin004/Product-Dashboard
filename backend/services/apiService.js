// fetch data API 

const axios = require("axios");

const fetchProducts = async () => {
  const res = await axios.get("https://dummyjson.com/products");
  return res.data.products;
};

module.exports = { fetchProducts };