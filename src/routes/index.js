const { Router } = require("express")

const usersRoutes = require("./users.routes")
const sessionsRoutes = require("./sessions.routes")

const routes = Router()

routes.use("/sessions", sessionsRoutes)
routes.use("/users", usersRoutes)

module.exports = routes