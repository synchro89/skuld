const routes = require("express").Router();

const AnimeController = require("../controllers/animes");

routes.post("/", AnimeController.Create);

module.exports = app => app.use("/animes", routes);