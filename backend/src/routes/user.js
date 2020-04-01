const routes = require('express').Router();

const UserController = require("../controllers/users");

routes.get("/", UserController.Index);
routes.post("/", UserController.Store);
routes.put("/:name", UserController.Update);

module.exports = (app) => app.use("/users", routes);