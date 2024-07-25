const mangaModel = require("../models/Manga");

module.exports = {
  getAll: (req, res) => {
    mangaModel
      .find({})
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  getById: async (req, res) => {
    try {
      const item = await mangaModel.findById(req.params.id);
      res.json(item);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  add: async (req, res) => {
    try {
      const savedItem = await new mangaModel(req.body).save();
      res.json(savedItem);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  delete: async (req, res) => {
    try {
      const item = await mangaModel.deleteOne({ _id: req.params.id });
      res.json({ success: true });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  update: async (req, res) => {
    try {
        const item = await mangaModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            {
                new: true
            }
        );

        res.json(item);
    } catch (err) {
        res.status(500).json(err);
    }
  }
};
