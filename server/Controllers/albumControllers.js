const Albums = require("../Model/album");

const getAlbums = async (req, res) => {
  try {
    let result = await Albums.find();
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAlbumsTracks = async (req, res) => {
  const { id } = req.query;
  try {
    const albumTrack = await Albums.findById(id);
    if (!albumTrack) {
      throw new Error("No data found");
    } else {
      res.json(albumTrack);
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const getAlbumsPages = async (req, res) => {
  const { genres, year, name } = req.query;
  const limit = Number(req.query.limit);
  let page = 1;
  if (req.query.name == "") {
    page = Number(req.query.page);
  }

  let sortByYear = year == "asc" ? 1 : year == "desc" ? -1 : 0;
  if (genres != undefined && name == undefined) {
    const AlbumsDataCout = await Albums.countDocuments(
      {
        genres: { $regex: genres },
      },
      (err) => {
        if (err) console.log(err);
      }
    );
    const finalPage = Math.ceil(AlbumsDataCout / limit);
    try {
      const results = await Albums.find({
        genres: { $regex: genres },
      })
        .sort({ released: sortByYear })
        .skip((page - 1) * limit)
        .limit(limit);
      return res
        .status(200)
        .send({ data: results, currentpage: page, finalPage });
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something went wrong");
    }
  } else if (genres == undefined && name != undefined) {
    const AlbumsDataCout = await Albums.countDocuments(
      {
        name: { $regex: name },
      },
      (err) => {
        if (err) console.log(err);
      }
    );
    const finalPage = Math.ceil(AlbumsDataCout / limit);
    try {
      const results = await Albums.find({
        name: { $regex: name },
      })
        .sort({ released: sortByYear })
        .skip((page - 1) * limit)
        .limit(limit);
      return res
        .status(200)
        .send({ data: results, currentpage: page, finalPage });
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something went wrong");
    }
  } else if (name != undefined && genres != undefined) {
    const AlbumsDataCout = await Albums.countDocuments(
      {
        name: { $regex: name },
        genres: { $regex: genres },
      },
      (err) => {
        if (err) console.log(err);
      }
    );
    const finalPage = Math.ceil(AlbumsDataCout / limit);
    try {
      const results = await Albums.find({
        name: { $regex: name },
        genres: { $regex: genres },
      })
        .sort({ released: sortByYear })
        .skip((page - 1) * limit)
        .limit(limit);
      return res
        .status(200)
        .send({ data: results, currentpage: page, finalPage });
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something went wrong");
    }
  } else {
    const AlbumsDataCout = await Albums.countDocuments({}, (err) => {
      if (err) console.log(err);
    });
    const finalPage = Math.ceil(AlbumsDataCout / limit);
    try {
      const results = await Albums.find({ genres: { $regex: genres } })
        .sort({ released: sortByYear })
        .skip((page - 1) * limit)
        .limit(limit);
      return res
        .status(200)
        .send({ data: results, currentpage: page, finalPage });
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something went wrong");
    }
  }
};

module.exports = { getAlbums, getAlbumsTracks, getAlbumsPages };
