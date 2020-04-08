import "./scripts/script";

import Router, { privateRoute as privateR, publicRoute as publicR, access_types } from "./app/routes";

import LoginPage from "./views/pages/login";
import SignupPage from "./views/pages/signup";

document.addEventListener("DOMContentLoaded", () => {

    const Login = LoginPage();
    // const Signup = SignupPage();

    Router.get("/", {
        willRender: Login.willRender,
        render: Login.render,
        didRender: Login.didRender,
        unMount: Login.unMount,
        access: access_types.PRIVATE_ONLY
    });

    Router.get("/login", publicR(() => {
        console.log("Estou na pagina login");
    }));

    Router.get("*", () => { });

    Router.configure({
        redirectWhenNotAuth: "/login",
        redirectWhenAuth: "/"
    });

    Router.init();
});