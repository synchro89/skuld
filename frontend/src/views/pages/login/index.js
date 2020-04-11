import "./styles.scss";

import _ from "lodash";

import Router from "../../../app/routes";

import Rain from "../../../scripts/rain";

import Form from "../../../scripts/form";

import Auth from "../../../app/auth";

import { Users } from "../../../app/services/sdk/backend";

import { isValidName, getById, queryAll } from "../../../scripts/utils";

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
        },
        didRender: async function (props) {
            const {
                nameField,
                passwordField,
                buttonSubmit
            } = props.lifeCycle.willRender;

            const nameApi = await nameField.didRender();
            const passwordApi = await passwordField.didRender();
            const btnSubmitApi = await buttonSubmit.didRender();

            Form({
                config: {
                    selector: "login-form",
                    useId: true,
                    onSubmit
                }
            });

            async function onSubmit({ login_name: name, login_password: password }) {
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

                console.log(name, password);
                try {
                    const response = await Users.auth({
                        name,
                        password
                    });

                    const { data, accessToken } = response;

                    Auth.login(accessToken, data);
                } catch (error) {
                    if (error.code === "user/not-exists")
                        return nameApi.setError("This user not exists, you have an account?");

                    if (error.code === "user/invalid-password")
                        return passwordApi.setError("Incorrect password");

                    console.log(error);
                    return nameApi.setError("An error ocurred, sorry, try again");
                } finally {
                    btnSubmitApi.setLoading(false);
                }
            }


            const links = queryAll(".auth-wrapper a");

            for (const link of links) {
                link.onclick = e => {
                    e.preventDefault();
                    Router.navigateTo(link.href);
                }
            }

            const { removeRain } = Rain(getById("auth-canvas"));

            return {
                removeRain
            }
        },
        unMount: async function (props) {
            const {
                buttonSubmit
            } = props.lifeCycle.willRender;

            buttonSubmit.unMount();

            props.lifeCycle.didRender.removeRain();
        }
    }
}