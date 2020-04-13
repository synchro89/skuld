// import "./styles.scss";

import Ripple from "../../../scripts/ripple";

import root from "../../root";

export default async function SignupPage() {
    return {
        willRender: async function () {
            console.log("bah");
        },
        render: async function (props) {
            console.log("page sign");
            const SignupHTML = `
                <div>page register</div>
            `
            root.innerHTML = SignupHTML;

            return SignupHTML;
        },
        didRender: async function (props) {
        },
        unMount: async function (props) {
        }
    }
}