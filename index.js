require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const restaurantRoutes = require("./routes/restaurant");

mongoose.set("strictQuery", true);
const connString = process.env.DATABASE_URL;

mongoose.connect(connString);

const database = mongoose.connection;

const app = express();
app.use(express.json())
app.use("/api", restaurantRoutes)

app.listen(8000, () => {
  console.log(`Server started at ${8000}`);
});
