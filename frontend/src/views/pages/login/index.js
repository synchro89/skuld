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
                <div class="testando"></div>
            `
            root.innerHTML = LoginHTML;

            return LoginHTML;
        },
        didRender: async function (props) {

        },
        unMount: async function (props) {

        }
    }
}