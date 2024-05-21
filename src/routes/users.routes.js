const { Router } = require("express")

const ensureAuth = require("../middlewares/ensureAuth")
const UsersController = require("../controllers/UsersController")

const usersRoutes = Router()

const usersController = new UsersController()

usersRoutes.post("/", usersController.create)
usersRoutes.put("/", ensureAuth, usersController.uptade)
usersRoutes.delete("/", ensureAuth, usersController.delete)

module.exports = usersRoutes;