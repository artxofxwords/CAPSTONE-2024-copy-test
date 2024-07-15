const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes")

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

mongoose.connect("mongodb+srv://TyBenedict:llKoNQRH5vYE712P@capstone.us3iibp.mongodb.net/Ty");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error."));
db.once("open", () => {
    console.log("Connected to database.");
})

app.use("/users", userRoutes)

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})