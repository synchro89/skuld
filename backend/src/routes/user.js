const routes = require('express').Router();

routes.get("/", (req, res) => {
    res.json({
        path: "/users",
        ok: true
    });
});

module.exports = (app) => app.use("/users", routes);