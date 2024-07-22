const mongoose = require("mongoose");

const MangaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 

    author: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    imageUrl: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    publishedDate: {
        type: Date,
        required: true
    },

    genres: {
        type: [String],
        required: true
    },

    volume: {
        type: Number,
        required: true
    },

    rating: {
        type: Number,
        required: true
    }
});

const Model = mongoose.model("Manga", MangaSchema);

module.exports = Model;