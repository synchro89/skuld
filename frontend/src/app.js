import "./scripts/script";

import Router from "./app/routes";

document.addEventListener("DOMContentLoaded", () => {
    Router.get("/", () => { });
    Router.get("/users/:id", () => { });
    Router.get("*", () => { });
    Router.init();

    setTimeout(() => {
        Router.navigateTo("/aksoaks");
        console.log("yeah");

        setTimeout(() => {
            Router.prev();
            setTimeout(() => {
                Router.next();
            }, 5000)
        }, 5000)

    }, 3000)
})