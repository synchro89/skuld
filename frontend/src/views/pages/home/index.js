import "./styles.scss";

import Auth from "../../../app/auth";

import root from "../../root";

import ButtonRipple from "../../components/AuthSubmitButton";

export default function HomePage() {
    return {
        willRender: async function () {
            const btn = ButtonRipple({
                config: {
                    label: "Deslogar",
                    onClick: Auth.logout.bind(Auth)
                }
            });
            return {
                btn
            }
        },
        render: async function (props) {
            const { btn } = props.lifeCycle.willRender;

            const HTML = `
                ${await btn.render()}
            `
            root.innerHTML = HTML;
        },
        didRender: async function (props) {
            props.lifeCycle.willRender.btn.didRender();
        },
        unMount: async function (props) {
            props.lifeCycle.didRender.removeRipple();
            props.lifeCycle.willRender.btn.unMount();
        }
    }
}