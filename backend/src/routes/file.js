const routes = require('express').Router();

const FileController = require("../controllers/file");

routes.get("/", FileController.Index);
routes.post("/", FileController.Store);

module.exports = (app) => app.use("/uploads", routes);