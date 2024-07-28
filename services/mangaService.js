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
          new: true,
        }
      );

      res.json(item);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getLatest: (req, res) => {
    mangaModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(3)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
        console.log(err);
      });
  },

  searchMangas: async (req, res) => {
    const { title, category, rating, price } = req.query;

    let filter = {};

    if (title) {
      filter.title = new RegExp(title, 'i');
    }

    if (category) {
      filter.category = category;
    }

    let sort = {};
    if (price) {
      sort.price = price === 'low-to-high' ? 1 : -1;
    } else if (rating) {
      sort.rating = rating === 'low-to-high' ? 1 : -1;
    }

    try {
      const items = await mangaModel.find(filter).sort(sort);
      res.json(items);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  }
};
