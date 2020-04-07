import "./scripts/script";

import Router, { privateRoute as private, publicRoute as public } from "./app/routes";

document.addEventListener("DOMContentLoaded", () => {
    Router.get("/", private(() => {
        console.log("Estou na pagina dashboard/home");
    }));
    Router.get("/login", public(() => {
        console.log("Estou na pagina login");
    }));
    Router.get("*", () => { });

    Router.configure({
        redirectWhenNotAuth: "/login",
        redirectWhenAuth: "/"
    });

    Router.init();
})