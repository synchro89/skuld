const routes = require("express").Router();

const ResourceMiddleware = require("../controllers/resources");

routes.get("/:resource", ResourceMiddleware.Index);

module.exports = app => app.use("/resources", routes);