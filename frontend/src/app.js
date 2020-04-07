import "./scripts/script";

import Router from "./app/routes/router";

document.addEventListener("DOMContentLoaded", () => {
    Router.get("/", () => { });
    Router.get("/:id/:simdeubom", () => { });
    Router.get("*", () => { });
    Router.init();
})