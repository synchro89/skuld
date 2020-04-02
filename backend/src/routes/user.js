const routes = require('express').Router();

const UserController = require("../controllers/users");

const multer = require('multer')
const { storage } = require("../multer");
const upload = multer({ storage })

routes.get("/", UserController.Index);
routes.get("/:name", UserController.Get);

routes.post("/", upload.single('photo'), UserController.Store);
routes.post("/auth", UserController.Auth);
routes.put("/:name", upload.single('photo'), UserController.Update);

routes.delete("/:name", UserController.Delete);


module.exports = (app) => app.use("/users", routes);