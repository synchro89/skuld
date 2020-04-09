import "./styles.scss";

import Logo from "../../../images/favicon.png"

import Router from "../../../app/routes";

import Ripple from "../../../scripts/ripple";

import canvas from "./canvas";

import root from "../../root";

export default function LoginPage() {
    return {
        willRender: async function () {
            return await (await fetch("https://api.github.com/users/lakscastro")).json();
        },
        render: async function (props) {
            console.log("page login");
            const LoginHTML = `
            <canvas id="auth-canvas"></canvas>
            <div class="auth-wrapper">
                <form class="auth-form" autocomplete="off">
                    
                    <header class="auth-form__header">
                        <h1>Welcome Back!</h1>
                        <p>We are glad for see you again!</p>
                    </header>
                    <div class="auth-wrapper__field">
                        <label class="auth-wrapper__label auth-wrapper__label--as-wrapper" for="login_name">USERNAME</label>
                        <div class="auth-input-wrapper">
                            <span class="auth-input-wrapper__icon material-icons">person</span>
                            <input class="auth-input-wrapper__input" id="login_name" type="text" name="login_name"
                                autofocus>
                        </div>
                    </div>

                    <div class="auth-wrapper__field">
                        <label class="auth-wrapper__label auth-wrapper__label--as-wrapper" for="login_password">PASSWORD</label>
                        <div class="auth-input-wrapper">
                            <span class="auth-input-wrapper__icon material-icons">https</span>
                            <input class="auth-input-wrapper__input" id="login_password" type="password" name="login_password">
                            <span id="show_password" data-target="login_password" class="pointer auth-input-wrapper__icon material-icons">visibility</span>
                        </div>
                        <a class="auth-wrapper__label auth-wrapper__label--active border-on-hover use-padding" href="/reset">Reset password</a>
                    </div>
                    

                    <button class="auth-submit" type="submit">Login</button>
                    <p
                        class="auth-wrapper__label auth-wrapper__label--disabled"
                    >
                        Need a account? 
                        <a 
                            href="/register" 
                            class="auth-wrapper__label--active border-on-hover"
                        >
                            Register
                        <a>
                    </p>
                </form>
            </div>
            `
            root.innerHTML = LoginHTML;

            return LoginHTML;
        },
        didRender: async function (props) {
            const form = document.getElementsByClassName("auth-wrapper")[0];
            const buttonSubmit = document.getElementsByClassName("auth-submit")[0];
            const links = document.querySelectorAll(".auth-wrapper a");

            const showPass = document.getElementById("show_password");
            const inputTarget = document.getElementById(showPass.getAttribute("data-target"));

            showPass.onclick = function () {
                const newType = inputTarget.getAttribute("type") === "password" ? "text" : "password";
                const newIcon = newType === "password" ? "visibility" : "visibility_off"
                inputTarget.setAttribute("type", newType);
                showPass.textContent = newIcon;
            }

            for (const link of links) {
                link.onclick = e => {
                    e.preventDefault();
                    Router.navigateTo(link.href);
                }
            }

            form.onsubmit = e => {
                e.preventDefault();
                console.log(e);
            }

            const removeRipple = new Ripple(buttonSubmit, {
                color: "var(--tap)",
                size: 5
            });

            canvas(document.getElementById("auth-canvas"));

            return {
                removeRipple
            }
        },
        unMount: async function (props) {
            props.lifeCycle.didRender.removeRipple();
        }
    }
}