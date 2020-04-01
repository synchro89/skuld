const routes = require('express').Router();

const UserController = require("../controllers/users");

routes.get("/", UserController.Index);
routes.get("/:name", UserController.Get);

routes.post("/", UserController.Store);
routes.put("/:name", UserController.Update);

routes.delete("/:name", UserController.Delete);

module.exports = (app) => app.use("/users", routes);