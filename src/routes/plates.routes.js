const { Router } = require("express")

const ensureAuth = require("../middlewares/ensureAuth")
const roleAuth = require("../middlewares/roleAuth")
const PlatesController = require("../controllers/PlatesController")

const platesRoutes = Router()

const platesController = new PlatesController()

platesRoutes.use(ensureAuth)

platesRoutes.post("/", roleAuth("admin"), platesController.create)
platesRoutes.put("/:id", roleAuth("admin"), platesController.uptade)
platesRoutes.delete("/:id", roleAuth("admin"), platesController.delete)

platesRoutes.get("/", platesController.index)
platesRoutes.get("/:id", platesController.show)

module.exports = platesRoutes