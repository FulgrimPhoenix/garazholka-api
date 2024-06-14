const { UserAlreadyExists } = require("../errors/errors");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const constants = require("../utils/constants");

const { NODE_ENV, JWT_SECRET } = process.env;

const signup = (req, res, next) => {
  const {
    email,
    password,
    name,
    groupId,
    freeTime,
    preferedLocations,
    preferedInterests,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new UserAlreadyExists(constants.errorMassages.userAlreadyExist);
      }

      return bcrypt
        .hash(password, 10)
        .then((hash) => {
          const newUser = new User({
            email: email,
            name: name,
            password: hash,
            groupId: groupId,
            freeTime: freeTime,
            preferedLocations: preferedLocations,
            preferedInterests: preferedInterests,
          });

          return newUser.save().then((createdUser) => {
            res.status(201).json({
              id: createdUser._id,
              email: createdUser.email,
              name: createdUser.name,
              freeTime: createdUser.freeTime,
              preferedLocations: createdUser.preferedLocations,
              preferedInterests: createdUser.preferedInterests,
            });
          });
        })

        .then((user) => res.status(201).send(user));
    })
    .catch(next);
};

const signin = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((findedUser) => {
      const token = jwt.sign(
        { _id: findedUser._id },
        NODE_ENV === "production" ? JWT_SECRET : "strong-secret"
      );

      return res
        .cookie("jwt", token, {
          httpOnly: true,
          maxAge: 3600000 * 24,
          sameSite: "none",
          secure: true,
        })
        .status(200)
        .json({
          id: findedUser._id,
          email: findedUser.email,
          name: findedUser.name,
          freeTime: findedUser.freeTime,
          preferedLocations: findedUser.preferedLocations,
          preferedInterests: findedUser.preferedInterests,
        })
        .end();
    })
    .catch(next);
};

const signout = (req, res, next) => {
  try{
    res.clearCookie('jwt')
    res.status(200).json({message: constants.responseMasseges.signOut})
  }catch (err){
    next(err)
  }
}

module.exports = {
  signup,
  signin,
  signout,
};
