const { Router } = require("express")

const ensureAuth = require("../middlewares/ensureAuth")
const PlatesController = require("../controllers/PlatesController")

const platesRoutes = Router()

const platesController = new PlatesController()

platesRoutes.post("/", platesController.create) // ADMIN
platesRoutes.put("/", platesController.uptade) // ADMIN 
platesRoutes.delete("/", platesController.delete) // ADMIN

platesRoutes.get("/", platesController.index) // USUÁRIOS
platesRoutes.get("/id", platesController.show) // USUÁRIOS

module.exports = platesRoutes