const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db/models/index");
const { product } = db;

const ProductsRouter = require("./routers/productsRouter");
const ProductsController = require("./controllers/productsController");

const PORT = process.env.PORT || 3000;

const app = express();

const productsController = new ProductsController(product);
const productsRouter = new ProductsRouter(express, productsController).routes();

app.use(cors());
app.use(express.json());

app.use("/products", productsRouter);

app.listen(PORT, () => {
  console.log("Application listening to port 3000");
});
