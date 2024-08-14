const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const proposalRoutes = require("./routes/proposalRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//mongodb+srv://TyBenedict:llKoNQRH5vYE712P@capstone.us3iibp.mongodb.net/Capstone
mongoose.connect(
  process.env.MONGO_URI
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error."));
db.once("open", () => {
  console.log("Connected to database.");
});

app.use("/users", userRoutes);
app.use("/proposals", proposalRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
