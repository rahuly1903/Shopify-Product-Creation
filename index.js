const express = require("express");
const shopifyAPI = require("shopify-node-api");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 4000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// parse application/json
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

var Shopify = new shopifyAPI({
  shop: process.env.SHOP, // MYSHOP.myshopify.com
  shopify_api_key: process.env.SHOPIFY_API_KEY, // Your API key
  access_token: process.env.ACCESS_TOKEN, // Your API password
});
app.get("/", (req, res) => {
  res.send({ msg: "Welcome to Homepage" });
});
app.post("/api/create-product", async (req, res) => {
  const post_data = req.body;
  await Shopify.post(
    "/admin/products.json",
    post_data,
    function (err, data, headers) {
      if (err) {
        res.send(err);
        return false;
      }
      res.send(data);
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
