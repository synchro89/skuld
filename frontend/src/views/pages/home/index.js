import "./styles.scss";

import Auth from "../../../app/auth";

import { AnimesApi } from "../../../app/services/sdk/api";

import root from "../../root";

import ScrollViewAnime from "../../components/ScrollViewAnime";
import Layout from "../../components/Layout";
import Wrapper from "../../components/Wrapper";


export default async function HomePage() {

    const scrollWrapper = await ScrollViewAnime(5);
    const wrapper = await Wrapper(scrollWrapper);
    const HTML = `
        ${await wrapper.render()}
    `

    const lay = await Layout(HTML);

    return {
        willRender: async function () {

        },
        render: async function () {
            root.innerHTML = await lay.render();


            // const trending = AnimesApi.paginate({
            //     limit: 5,
            //     fields: ["slug", "titles", "posterImage"],
            //     status: AnimesApi.status_types.TRENDING
            // });

            // let initialData = null;
            // initialData = await trending.getOnly(5);

            // initialData.forEach(({ attributes: { posterImage: { medium }, slug } }) => {
            //     const item = `<div style="width: 100px">
            //         <img width="100" src="${medium}" alt="${slug}">
            //     </div>`.toHtml();

            //     item.style.opacity = 0.5;
            //     root.appendChild(item);
            //     new Ripple(item, {
            //         color: "var(--tap)",
            //         size: 5
            //     });
            // });


            // const current = AnimesApi.paginate({
            //     limit: 5,
            //     fields: ["slug", "titles"],
            //     status: AnimesApi.status_types.CURRENT
            // });
            // await current.initialData();


            // const upcoming = AnimesApi.paginate({
            //     limit: 5,
            //     fields: ["slug", "titles"],
            //     status: AnimesApi.status_types.UPCOMING
            // });
            // await upcoming.initialData();


            // const rated = AnimesApi.paginate({
            //     limit: 5,
            //     fields: ["slug", "titles"],
            //     status: AnimesApi.status_types.RATED
            // });
            // await rated.initialData();


            // const popular = AnimesApi.paginate({
            //     limit: 5,
            //     fields: ["slug", "titles"],
            //     status: AnimesApi.status_types.POPULAR
            // });
            // await popular.initialData();


            // const all = AnimesApi.paginate({
            //     limit: 5,
            //     fields: ["slug", "titles"],
            //     status: AnimesApi.status_types.ALL
            // });
            // await all.initialData();

            // const data = {
            //     trending,
            //     current,
            //     upcoming,
            //     rated,
            //     popular,
            //     all
            // }

            return {
                // data
            }
        },
        didRender: async function () {
            await lay.didRender();
            await wrapper.didRender();
        },
        unMount: async function () {
            await lay.unMount();
            await wrapper.unMount();
        }
    }
}