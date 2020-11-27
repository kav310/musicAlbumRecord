const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const Albums = require("./Model/album");
const albums = require("./mockdata");
const albumRouter = require("./Routes/albumRoutes");

const app = express();
const db = mongoose.connection;

dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/api", albumRouter);

mongoose.connect(
  process.env.ATLAS_URI,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  (error) => {
    if (error) console.log(`error connecting database : ${error}`);
    else console.log("Database is successfully connected");
  }
);

db.once("open", async (req, res) => {
  if ((await Albums.countDocuments().exec()) > 0) {
    console.log("Album Tracks already added in the collection");
    return;
  }

  Albums.insertMany(albums)
    .then(() => console.log("Album Tracks added Successfully"))
    .catch((err) => console.log(`Error : ${err}`));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
