const express = require("express");
const {
  getAlbums,
  getAlbumsTracks,
  getAlbumsPages,
} = require("../Controllers/albumControllers");

const router = express.Router();

router.get("/albums", getAlbums);
router.get("/albumTracks", getAlbumsTracks);
router.get("/albumPages", getAlbumsPages);

module.exports = router;
