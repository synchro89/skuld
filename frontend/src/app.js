import "./scripts/script";

import Auth from "./app/auth";

import Router from "./app/routes";

document.addEventListener("DOMContentLoaded", () => {
    Router.get("/", () => { });
    Router.get("/users/:id", () => { });
    Router.get("*", () => { });
    Router.init();
    (async function () {
        await Auth.init();
    })()
})