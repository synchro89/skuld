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

                    <label class="auth-wrapper__label" for="login_name">USERNAME</label>
                    <div class="auth-input-wrapper">
                        <span class="auth-input-wrapper__icon material-icons">person</span>
                        <input class="auth-input-wrapper__input" id="login_name" type="text" name="login_name"
                            placeholder="Username" autofocus>
                    </div>

                    <label class="auth-wrapper__label" for="login_name">PASSWORD</label>
                    <div class="auth-input-wrapper">
                        <span class="auth-input-wrapper__icon material-icons">https</span>
                        <input class="auth-input-wrapper__input" id="login_password" type="password" name="login_password" placeholder="Password">
                    </div>
                    <a href="/register" class="auth-link">Need a account? Register</a>

                    <button class="auth-submit" type="submit">Login</button>

                </form>
            </div>
            `
            root.innerHTML = LoginHTML;

            return LoginHTML;
        },
        didRender: async function (props) {
            const form = document.getElementsByClassName("auth-wrapper")[0];
            const buttonSubmit = document.getElementsByClassName("auth-submit")[0];
            const authLink = document.getElementsByClassName("auth-link")[0];

            form.onsubmit = e => {
                e.preventDefault();
                console.log(e);
            }
            authLink.onclick = e => {
                e.preventDefault();
                Router.navigateTo(authLink.href);
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