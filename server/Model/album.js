const mongoose = require("mongoose");
const { Schema } = mongoose;

const albumSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    artistName: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    genres: {
      type: String,
      required: true,
    },
    released: {
      type: Number,
      required: true,
    },
    trackCount: {
      type: String,
      required: true,
    },
    tracks: [
      {
        playbackSeconds: String,
        name: String,
      },
    ],
  },
  { versionKey: false }
);

module.exports = mongoose.model("Album", albumSchema);
