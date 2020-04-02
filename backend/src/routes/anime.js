const routes = require("express").Router();

const AnimeController = require("../controllers/animes");

const authMiddleware = require("../middlewares/auth");

routes.post("/", authMiddleware(), AnimeController.Create);

module.exports = app => app.use("/animes", routes);