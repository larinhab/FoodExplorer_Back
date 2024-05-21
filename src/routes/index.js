const { Router } = require("express")

const sessionsRoutes = require("./sessions.routes")

const usersRoutes = require("./users.routes")
const platesRoutes = require("./plates.routes")

const routes = Router()

routes.use("/sessions", sessionsRoutes)
routes.use("/users", usersRoutes)
routes.use("/plates", platesRoutes)

module.exports = routes