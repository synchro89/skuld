import "./styles.scss";

import root from "../../root";

export default function LoginPage() {
    return {
        willRender: async function () {
            return "a, sim";
        },
        render: async function (props) {
            console.log("toquiwapopra");
            console.log(props.data);
            const LoginHTML = `
                <input type="text" name="name" placeholder"nome" id="name">
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