const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  streetAddress: {
    type: String,
    required: true,
  },
});

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    address: {
      type: addressSchema,
    },

    role: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    collection: "users",
    timestamps: true,
    writeConcern: {
      w: "majority",
      j: true,
      wtimeoutMS: 30000,
    },
    read: "nearest",
  }
);


const Model = mongoose.model('User', UserSchema);

module.exports = Model;