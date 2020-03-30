const routes = require('express').Router();

const UserController = require("../controllers/users");

routes.get("/", UserController.Index);
routes.post("/", UserController.Store);

module.exports = (app) => app.use("/users", routes);