const jwt = require("jsonwebtoken");
const { AuthError } = require("../errors/errors");
const constants = require("../utils/constants");

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    let payload;

    if (!token) {
      throw new AuthError({ message: constants.errorMassages.authError });
    }

    try {
      payload = jwt.verify(
        token,
        NODE_ENV === "production" ? JWT_SECRET : "strong-secret"
      );
    } catch {
      throw new AuthError({ message: constants.errorMassages.authError });
    }

    req.user = payload;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  auth,
};
