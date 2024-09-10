const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../config/upload")

const ensureAuth = require("../middlewares/ensureAuth")
const roleAuth = require("../middlewares/roleAuth")
const PlatesController = require("../controllers/PlatesController")

const platesRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const platesController = new PlatesController()

platesRoutes.use(ensureAuth)

platesRoutes.post("/", roleAuth("admin"), upload.single("image"), platesController.create)
platesRoutes.patch("/:id", roleAuth("admin"), upload.single("image"), platesController.uptade)
platesRoutes.delete("/:id", roleAuth("admin"), platesController.delete)

platesRoutes.get("/", platesController.index)
platesRoutes.get("/:id", platesController.show)

module.exports = platesRoutes