const { Router } = require("express");
const ensureAuth = require("../middlewares/ensureAuth");
const FavoritesController = require("../controllers/FavoritesController");

const favoritesRoutes = Router();
const favoritesController = new FavoritesController();

favoritesRoutes.get("/", ensureAuth, favoritesController.index);
favoritesRoutes.post("/", ensureAuth, favoritesController.create);
favoritesRoutes.delete("/:id", ensureAuth, favoritesController.delete);

module.exports = favoritesRoutes;