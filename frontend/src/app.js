import "./scripts/script";

import Router, { privateRoute as privateR, publicRoute as publicR } from "./app/routes";

document.addEventListener("DOMContentLoaded", () => {
    Router.get("/", privateR(() => {
        console.log("Estou na pagina dashboard/home");
    }));
    Router.get("/login", publicR(() => {
        console.log("Estou na pagina login");
    }));
    Router.get("*", () => { });

    Router.configure({
        redirectWhenNotAuth: "/login",
        redirectWhenAuth: "/"
    });

    Router.init();
})