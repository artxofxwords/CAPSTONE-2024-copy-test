const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

mongoose.connect("mongodb://localhost:27017/capstone");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error."));
db.once("open", () => {
    console.log("Connected to database.");
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})