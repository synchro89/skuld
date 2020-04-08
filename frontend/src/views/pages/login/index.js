import "./styles.scss";

import Ripple from "../../../scripts/ripple";

import root from "../../root";

export default function LoginPage() {
    return {
        willRender: async function () {
            return await (await fetch("https://api.github.com/users/lakscastro")).json();
        },
        render: async function (props) {
            console.log("page login");
            const LoginHTML = `
            <div class="auth-wrapper">
                <form class="auth-form">

                    <label for="login_name">Username</label>
                    <div class="auth-input-wrapper">
                        <span class="auth-input-wrapper__icon material-icons">person</span>
                        <input class="auth-input-wrapper__input" id="login_name" type="text" name="login_name"
                            placeholder="Username" autofocus>
                    </div>

                    <label for="login_name">Password</label>
                    <div class="auth-input-wrapper">
                        <span class="auth-input-wrapper__icon material-icons">person</span>
                        <input class="auth-input-wrapper__input" id="login_password" type="password" name="login_password" placeholder="Password">
                    </div>

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

            form.onsubmit = e => {
                e.preventDefault();
                console.log(e);
            }

            const removeRipple = new Ripple(buttonSubmit, {
                color: "rgba(0,0,0,0.3)",
                size: 5
            });

            return {
                removeRipple
            }
        },
        unMount: async function (props) {

        }
    }
}