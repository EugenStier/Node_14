const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Подключено к MongoDB"))
  .catch((err) => console.error("Ошибка подключения к MongoDB:", err));

const Category = require("./models/Category");
const Product = require("./models/Product");

app.post("/categories", async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Ошибка при добавлении категории", error: err });
  }
});

app.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Ошибка при добавлении продукта", error: err });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json(products);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Ошибка при получении продуктов", error: err });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
