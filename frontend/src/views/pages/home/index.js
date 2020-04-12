import "./styles.scss";

import Auth from "../../../app/auth";

import { AnimesApi } from "../../../app/services/sdk/api";

import root from "../../root";

import Ripple from "../../../scripts/ripple";

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

            const trending = AnimesApi.paginate({
                limit: 5,
                fields: ["slug", "titles", "posterImage"],
                status: AnimesApi.status_types.TRENDING
            });

            let initialData = null;
            initialData = await trending.getOnly(5);

            initialData.forEach(({ attributes: { posterImage: { medium }, slug } }) => {
                const item = `<div style="width: 100px">
                    <img width="100" src="${medium}" alt="${slug}">
                </div>`.toHtml();

                item.style.opacity = 0.5;
                root.appendChild(item);
                new Ripple(item, {
                    color: "var(--tap)",
                    size: 5
                });
            });


            const current = AnimesApi.paginate({
                limit: 5,
                fields: ["slug", "titles"],
                status: AnimesApi.status_types.CURRENT
            });
            await current.initialData();


            const upcoming = AnimesApi.paginate({
                limit: 5,
                fields: ["slug", "titles"],
                status: AnimesApi.status_types.UPCOMING
            });
            await upcoming.initialData();


            const rated = AnimesApi.paginate({
                limit: 5,
                fields: ["slug", "titles"],
                status: AnimesApi.status_types.RATED
            });
            await rated.initialData();


            const popular = AnimesApi.paginate({
                limit: 5,
                fields: ["slug", "titles"],
                status: AnimesApi.status_types.POPULAR
            });
            await popular.initialData();


            const all = AnimesApi.paginate({
                limit: 5,
                fields: ["slug", "titles"],
                status: AnimesApi.status_types.ALL
            });
            await all.initialData();

            const data = {
                trending,
                current,
                upcoming,
                rated,
                popular,
                all
            }

            console.log(data);

            return {
                data
            }
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