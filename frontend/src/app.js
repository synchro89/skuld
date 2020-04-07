import "./scripts/script";

import Auth from "./app/auth";

import Router from "./app/routes";

document.addEventListener("DOMContentLoaded", () => {
    Router.get("/", () => { });
    Router.get("/users/:id", () => { });
    Router.get("*", () => { });
    Router.init();
    (async function () {
        let loadingUser = true;
        console.log("carregando usuário...");
        await Auth.init();

        const isAuth = Auth.isAuth();
        if (isAuth) {
            console.log("usuario logado:");
            console.log(Auth.userData);
        } else {
            console.log("usuario nao logado:");
        }
        loadingUser = false;
        console.log("usuario carregado");
    })()
})