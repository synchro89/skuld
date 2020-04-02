const routes = require('express').Router();

const UserController = require("../controllers/users");

const multer = require('multer')
const { storage } = require("../multer");
const upload = multer({ storage })

const authMiddleware = require("../middlewares/auth");

routes.get("/", authMiddleware(), UserController.Index);
routes.get("/:name", authMiddleware({ nextWithAuthState: true }), UserController.Get);

routes.post("/", upload.single('photo'), UserController.Store);
routes.post("/reset", authMiddleware(), UserController.Reset);
routes.post("/auth", UserController.Auth);
routes.put("/:name", authMiddleware(), upload.single('photo'), UserController.Update);

routes.delete("/:name", authMiddleware(), UserController.Delete);


module.exports = (app) => app.use("/users", routes);