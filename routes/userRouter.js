const { Router } = require("express");
const {
  getMyUserInfo,
  patchUserInfo,
  getUsersInfo,
} = require("../controllers/usersUtils");

const usersRouter = Router();

usersRouter.get("/me", getMyUserInfo);
usersRouter.patch("/me", patchUserInfo);
usersRouter.get("/", getUsersInfo);

module.exports = {
  usersRouter,
};
