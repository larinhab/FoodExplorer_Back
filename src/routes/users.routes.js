const { Router } = require("express");

const ensureAuth = require("../middlewares/ensureAuth");
const roleAuth = require("../middlewares/roleAuth");
const UsersController = require("../controllers/UsersController");
const ValidateController = require("../controllers/ValidateController");

const usersRoutes = Router();

const usersController =
  new UsersController();
const validateController =
  new ValidateController();

usersRoutes.get(
  "/validated",
  ensureAuth,
  validateController.execute
);

usersRoutes.post(
  "/",
  usersController.create
);
usersRoutes.put(
  "/:id",
  ensureAuth,
  usersController.uptade
);
usersRoutes.delete(
  "/:id",
  ensureAuth,
  roleAuth("admin, user"),
  usersController.delete
);

module.exports = usersRoutes;
