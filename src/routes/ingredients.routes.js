const { Router } = require("express");
const ensureAuth = require("../middlewares/ensureAuth");
const IngredientsController = require("../controllers/IngredientsController");

const ingredientsRoutes = Router();
const ingredientsController = new IngredientsController();

ingredientsRoutes.get("/", ensureAuth, ingredientsController.index);

module.exports = ingredientsRoutes;