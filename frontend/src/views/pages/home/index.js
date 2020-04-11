import "./styles.scss";

import Auth from "../../../app/auth";

import root from "../../root";

import Drawer from "../../components/Drawer";
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

            const drawer = Drawer();

            return {
                btn,
                drawer
            }
        },
        render: async function (props) {
            const { btn, drawer } = props.lifeCycle.willRender;

            const HTML = `
                ${await drawer.render()}
                ${await btn.render()}
            `
            root.innerHTML = HTML;
        },
        didRender: async function (props) {
            props.lifeCycle.willRender.btn.didRender();
            props.lifeCycle.willRender.drawer.didRender();
        },
        unMount: async function (props) {
            props.lifeCycle.willRender.btn.unMount();
        }
    }
}