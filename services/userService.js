const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    try {
      const exists = await userModel.findOne({
        email: req.body.email,
      });

      if (exists) {
        return res.status(409).json({
          message: "user_already_exists",
        });
      }

      const hashedPassword = bcrypt.hashSync(req.body.password, 10);

      const savedUser = await new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        address: req.body.address,
        role: "user",
        password: hashedPassword,
      }).save();

      const token = jwt.sign(
        {
          id: savedUser._id,
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          email: savedUser.email,
          address: savedUser.address,
          role: savedUser.role,
        },
        process.env.SECRET_KEY
      );

      res.json({ token });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  login: async (req, res) => {
    try {
      const user = await userModel.findOne({
        email: req.body.email,
      });

      if (!user) {
        return res.status(404).json({
          message: "user_not_found",
        });
      }

      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign(
          {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            address: user.address,
            role: user.role,
          },
          process.env.SECRET_KEY
        );

        res.json({ message: "Welcome Back!", token });
      } else {
        return res.status(404).json({
          message: "user_not_found",
        });
      }
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },

  getAll: (req, res) => {
    userModel
      .find({})
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  getUserById: async (req, res) => {
    try {
      const user = await userModel.findById(req.params.id);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  updateUser: async (req, res) => {
    try {
      const userId = req.user.id;

      if (req.user.role !== "user") {
        return res.status(403).json({ message: "Access denied." });
      }

      const updatedUser = await userModel.findByIdAndUpdate(userId, req.body, {
        new: true,
        runValidators: true,
      });

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found." });
      }

      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.user.id;
  
      if (req.user.role !== 'user') {
        return res.status(403).json({ message: 'Access denied.' });
      }
  
      const deletedUser = await userModel.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      res.json({ message: 'User deleted successfully.' });
    } catch (err) {
      res.status(500).json(err);
    }
  }  
};
