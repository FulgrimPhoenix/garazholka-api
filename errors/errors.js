/* eslint-disable max-classes-per-file */
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class UserAlreadyExists extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

class AccessError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = {
  NotFoundError,
  BadRequest,
  AuthError,
  UserAlreadyExists,
  AccessError,
};
