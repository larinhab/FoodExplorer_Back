const { Router } = require("express")

const sessionsRoutes = require("./sessions.routes")

const usersRoutes = require("./users.routes")
const platesRoutes = require("./plates.routes")
const ingredientsRoutes = require("./ingredients.routes")
const favoritesRoutes = require("./favorites.routes")

const routes = Router()

routes.use("/sessions", sessionsRoutes)
routes.use("/users", usersRoutes)
routes.use("/plates", platesRoutes)
routes.use("/ingredients", ingredientsRoutes)
routes.use("/favorites", favoritesRoutes)

module.exports = routes