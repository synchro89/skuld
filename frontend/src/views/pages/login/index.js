import "./styles.scss";

import loading from "../../../images/buttonLoading.svg"

import Router from "../../../app/routes";

import Rain from "../../../scripts/rain";

import Form from "../../../scripts/form";

import Auth from "../../../app/auth";

import { Users } from "../../../app/services/sdk/backend";

import { isValidName } from "../../../scripts/utils";

import Ripple from "../../../scripts/ripple";


import AuthField from "../../components/AuthField";

import root from "../../root";

export default function LoginPage() {
    return {
        willRender: async function () {
            const nameField = AuthField({
                userOptions: {
                    name: "login_name",
                    id: "login_name",
                    autofocus: true,
                    label: "username",
                    icon: "person"
                }
            });
            const passwordField = AuthField({
                userOptions: {
                    name: "login_password",
                    id: "login_password",
                    label: "password",
                    icon: "https",
                    type: "password",
                    inject: `<a class="auth-wrapper__label auth-wrapper__label--active border-on-hover use-padding" href="/reset">Reset password</a>`
                }
            });

            return {
                nameField,
                passwordField
            };
        },
        render: async function (props) {
            console.log(props);
            const {
                nameField,
                passwordField
            } = props.lifeCycle.willRender;


            const HTML = `
            <canvas id="auth-canvas"></canvas>
            <div class="auth-wrapper">
                <form id="login-form" class="auth-form" autocomplete="off">
                    
                    <header class="auth-form__header">
                        <h1>Welcome Back!</h1>
                        <p>We are glad for see you again!</p>
                    </header>

                    ${await nameField.render()}
                    ${await passwordField.render()}

                    <button class="auth-submit" type="submit">Login</button>
                    <p
                        class="auth-wrapper__label auth-wrapper__label--disabled"
                    >
                        Need a account? 
                        <a 
                            href="/register" 
                            class="use-padding auth-wrapper__label--active border-on-hover"
                        >
                            Register
                        <a>
                    </p>
                </form>
            </div>
            `
            root.innerHTML = HTML;

            return HTML;
        },
        didRender: async function (props) {
            const LoginForm = Form("login-form", true);

            const buttonSubmit = document.getElementsByClassName("auth-submit")[0];

            const links = document.querySelectorAll(".auth-wrapper a");

            const showPass = document.getElementById("show_password");
            const inputTarget = document.getElementById(showPass.getAttribute("data-target"));

            const inputs = document.getElementsByClassName("auth-input-wrapper__input");

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

            let removeRipple = null;

            removeRipple = new Ripple(buttonSubmit, {
                color: "var(--tap)",
                size: 5
            });

            function showLabelError(label, message) {
                label.classList.add("auth-wrapper__label--error");
                label.textContent = label.textContent + " - " + message;
            }
            function removeLabelError(label, originalMessage) {
                label.classList.remove("auth-wrapper__label--error");
                label.textContent = originalMessage;
            }

            form.onsubmit = e => {
                e.preventDefault();

                const fields = [...inputs].map(inp => ({
                    name: inp.name,
                    value: inp.value
                }));

                const [name] = fields.filter(field => field.name === "login_name");

                if (!name.value.length || !isValidName(name.value)) {
                    return showLabelError(document.querySelector(".auth-form label[for='login_name']"), "Names contains only letters and numbers");
                } else {
                    return alert("okk");
                }
                const [password] = fields.filter(field => field.name === "login_password");

                removeRipple();
                buttonSubmit.setAttribute("disabled", "true");
                console.log(loading)
                buttonSubmit.innerHTML = `
                    <div class="auth-submit__loader" data-delay="0"></div>
                    <div class="auth-submit__loader" data-delay="1"></div>
                    <div class="auth-submit__loader" data-delay="2"></div>
                `;

                // Users.auth({
                //     name: 
                // });

                setTimeout(() => {
                    buttonSubmit.removeAttribute("disabled")
                    buttonSubmit.innerHTML = `Login`;
                    removeRipple = new Ripple(buttonSubmit, {
                        color: "var(--tap)",
                        size: 5
                    });
                }, 15000);
            }

            const { removeRain } = Rain(document.getElementById("auth-canvas"));

            return {
                removeRipple,
                removeRain
            }
        },
        unMount: async function (props) {
            props.lifeCycle.didRender.removeRipple();
            props.lifeCycle.didRender.removeRain();
        }
    }
}