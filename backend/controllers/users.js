const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/user");

exports.user_signup = (req, res, next) => {
  //bcrypt function that takes in 1 plain text,
  //2 "salt rounds" -> add random strings to the plain text password before hashing
  //more secured, cause passwords can't be found in dictionary tables
  //3 call back function
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: hash,
        is_admin: req.body.is_admin,
      });
      user.save();
    }
  });
};

exports.user_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      //If user not found just return a false ah, then from frontend handle the display
      if (user.length >= 1) {
        //return true
        //compare passwords
      } else {
        //return false
        //password don't match
        //I think will take me awhile to do backend authentication
        //you can do other stuff first uh haha or go sleep
        //We download the chat for what ah HAHAHAHAHAH
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.users_get_all = (req, res, next) => {
  User.find()
    .select("name email password is_admin _id")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs.map((doc) => {
          return {
            name: doc.name,
            email: doc.email,
            password: doc.password,
            is_admin: doc.is_admin,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:9000/users/" + doc._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.user_create = (req, res, next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    is_admin: req.body.is_admin,
  });
  user
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Created user successfully",
        createdUsers: {
          name: result.name,
          email: result.email,
          password: result.password,
          is_admin: result.is_admin,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:9000/users/" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.user_get_by_id = (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .select("name email password is_admin _id")
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          user: doc,
          request: {
            type: "GET",
            url: "http://localhost:9000/users",
          },
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.reset_password = (req, res, next) => {
  //const id = req.params.userId;
  User.findOneAndUpdate(
    { email: req.body.email },
    { $set: { password: req.body.password } }
  )
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
