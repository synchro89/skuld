import "./scripts/script";

import Router, { privateRoute as privateR, publicRoute as publicR, access_types } from "./app/routes";

import Auth from "./app/auth";

import LoginPage from "./views/pages/login";
import SignupPage from "./views/pages/signup";
import HomePage from "./views/pages/home";

document.addEventListener("DOMContentLoaded", async () => {

    const Login = await LoginPage();
    const Signup = await SignupPage();
    const Home = await HomePage();

    Router.get("/", {
        ...Home,
        access: access_types.PRIVATE_ONLY
    });

    Router.get("/login", {
        ...Login,
        access: access_types.PUBLIC_ONLY
    });
    Router.get("/register", {
        ...Signup,
        access: access_types.PUBLIC_ONLY
    });

    Router.get("*", () => {
        console.log("404 page");
    });

    Router.configure({
        redirectWhenNotAuth: "/login",
        redirectWhenAuth: "/"
    });

    await Router.init();

    Auth.on(Auth.events.AUTH_STATE_CHANGE, () =>
        Router.navigateTo(window.location.href)
    );
});