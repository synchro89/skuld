import "./styles.scss";

import root from "../../root";

export default function LoginPage() {
    return {
        willRender: async function () {
            return await (await fetch("https://api.github.com/users/lakscastro")).json();
        },
        render: async function (props) {
            console.log("toquiwapopra");
            console.log();
            const teste = props.data.willRenderProps;
            const LoginHTML = `
                <div class="wrapper">
                    <h1></h1>
                </div>
            `
            root.innerHTML = LoginHTML;

            return LoginHTML;
        },
        didRender: async function (props) {
            const input = document.getElementById("name");
            input.oninput = e => console.log(e.target.value);
        },
        unMount: async function (props) {

        }
    }
}