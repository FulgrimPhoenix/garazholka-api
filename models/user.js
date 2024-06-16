const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { AuthError } = require("../errors/errors");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, minLength: 2, maxLength: 30, required: true },
  password: { type: String, required: true, select: false },
  groupId: { type: Number, required: true },
  freeTime: [{ type: String, required: true }],
  preferedLocations: [{ type: String, required: true }],
  preferedInterests: [{ type: String, required: true }],
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError("Неверная почта или пароль"));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new AuthError("Неверная почта или пароль"));
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
