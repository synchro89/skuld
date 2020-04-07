import "./scripts/script";

import Router from "./app/routes";

document.addEventListener("DOMContentLoaded", () => {
    Router.get("/", () => { });
    Router.get("/users/:id", () => { });
    Router.get("*", () => { });
    Router.init();

    setTimeout(() => {
        Router.navigateTo("/aksoaks/asasjfsdsjia");
    }, 3000)
})