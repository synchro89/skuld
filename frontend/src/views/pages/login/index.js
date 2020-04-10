import "./styles.scss";

import _ from "lodash";

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

    function onNameChange(value, api) {
        if (!value.length || !isValidName(value))
            return api.setError("Invalid username");
        else
            api.clearError();
    }
    function onPasswordChange(value, api) {
        if (!value.length || value.length < 5)
            return api.setError("Password must have 5 letters or more");
        else
            api.clearError();
    }

    return {
        willRender: async function () {
            const buttonSubmit = ButtonSubmit({
                config: {
                    label: "Login"
                }
            });
            const nameField = AuthField({
                config: {
                    name: "login_name",
                    id: "login_name",
                    autofocus: true,
                    label: "username",
                    icon: "person",
                    onInput: _.debounce(onNameChange, 300)
                }
            });
            const passwordField = AuthField({
                config: {
                    name: "login_password",
                    id: "login_password",
                    label: "password",
                    icon: "https",
                    type: "password",
                    inject: `<a class="auth-wrapper__label auth-wrapper__label--active border-on-hover use-padding" href="/reset">Reset password</a>`,
                    onInput: _.debounce(onPasswordChange, 300)
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

            const nameApi = await nameField.didRender();
            const passwordApi = await passwordField.didRender();

            const btnSubmitApi = await buttonSubmit.didRender();

            function onSubmit({ login_name: name, login_password: password }) {
                nameApi.clearError();
                passwordApi.clearError();

                if (!name.length || !isValidName(name)) {
                    nameApi.setError("Invalid username");
                    nameApi.heyHere();
                }

                if (!password.length || password.length < 5) {
                    passwordApi.setError("Password must have 5 letters or more");
                    passwordApi.heyHere();
                }

                if (passwordApi.error || nameApi.error)
                    return;

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