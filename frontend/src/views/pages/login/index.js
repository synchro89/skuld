import "./styles.scss";

import loading from "../../../images/buttonLoading.svg"

import Router from "../../../app/routes";

import Rain from "../../../scripts/rain";

import Form from "../../../scripts/form";

import Auth from "../../../app/auth";

import { Users } from "../../../app/services/sdk/backend";

import { isValidName } from "../../../scripts/utils";

import AuthField from "../../components/AuthField";
import ButtonSubmit from "../../components/AuthSubmitButton";

import root from "../../root";

export default function LoginPage() {
    return {
        willRender: async function () {
            const buttonSubmit = ButtonSubmit({
                config: {
                    label: "Login",
                    onClick: () => alert("a")
                }
            });
            const nameField = AuthField({
                config: {
                    name: "login_name",
                    id: "login_name",
                    autofocus: true,
                    label: "username",
                    icon: "person"
                }
            });
            const passwordField = AuthField({
                config: {
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
                passwordField,
                buttonSubmit
            };
        },
        render: async function (props) {
            const {
                nameField,
                passwordField,
                buttonSubmit
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
                    ${await buttonSubmit.render()}

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
            console.log(props);
            const {
                nameField,
                passwordField,
                buttonSubmit
            } = props.lifeCycle.willRender;

            await nameField.didRender();
            await passwordField.didRender();

            const btnSubmitApi = await buttonSubmit.didRender();

            function onSubmit({ login_name: name, login_password: password }) {
                btnSubmitApi.setLoading(true);

                setTimeout(() => {
                    console.log("terminei");
                    btnSubmitApi.setLoading(false);
                }, 5000);
            }
            const LoginForm = Form({
                config: {
                    selector: "login-form",
                    useId: true,
                    onSubmit
                }
            });


            const links = document.querySelectorAll(".auth-wrapper a");


            for (const link of links) {
                link.onclick = e => {
                    e.preventDefault();
                    Router.navigateTo(link.href);
                }
            }



            function showLabelError(label, message) {
                label.classList.add("auth-wrapper__label--error");
                label.textContent = label.textContent + " - " + message;
            }
            function removeLabelError(label, originalMessage) {
                label.classList.remove("auth-wrapper__label--error");
                label.textContent = originalMessage;
            }

            const { removeRain } = Rain(document.getElementById("auth-canvas"));

            return {
                removeRain
            }
        },
        unMount: async function (props) {
            props.lifeCycle.didRender.removeRipple();
            props.lifeCycle.didRender.removeRain();
        }
    }
}