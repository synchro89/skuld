import "./scripts/script";

import Router, { privateRoute as privateR, publicRoute as publicR, access_types } from "./app/routes";

import LoginPage from "./views/pages/login";
import SignupPage from "./views/pages/signup";

document.addEventListener("DOMContentLoaded", async () => {

    const Login = LoginPage();
    const Signup = SignupPage();

    Router.get("/", privateR(() => console.log("estou na pagina home")));

    Router.get("/login", {
        willRender: Login.willRender,
        render: Login.render,
        didRender: Login.didRender,
        unMount: Login.unMount,
        access: access_types.PUBLIC_ONLY
    });
    Router.get("/register", {
        willRender: Signup.willRender,
        render: Signup.render,
        didRender: Signup.didRender,
        unMount: Signup.unMount,
        access: access_types.PUBLIC_ONLY
    });

    Router.get("*", () => {
        console.log("agora to aqui");
    });

    Router.configure({
        redirectWhenNotAuth: "/login",
        redirectWhenAuth: "/"
    });

    await Router.init();
});