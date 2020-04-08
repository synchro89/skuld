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
            `
            root.innerHTML = LoginHTML;

            return LoginHTML;
        },
        didRender: async function (props) {
            const form = document.getElementsByClassName("auth-wrapper")[0];
            form.onsubmit = e => {
                e.preventDefault();
                console.log(e);
            }
        },
        unMount: async function (props) {

        }
    }
}