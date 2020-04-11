import "./styles.scss";

import _ from "lodash";

import Hammer from "hammerjs";

import { getById, getByClass, queryAll, query, interpolate } from "../../../scripts/utils";

export default function DrawerNavigator() {

    const HTML = `
        <aside id="drawer-wrapper" class="closed"></aside>
        <span id="drawer-span"></span>
    `

    let drawer = null;
    let drawerSpan = null;
    let drawerSpanTouch = null;

    let doc = null;
    let docTouch = null;

    let drawerOpened = false;

    const velocityToTransition = interpolate([0.3, 2], [0.3, 0.1]);
    function openDrawer(e) {
        if (drawerOpened) return;

        drawer.style.transition = `all ${velocityToTransition(e.velocityX)}s ease-in-out`;

        drawer.classList.add("open");
        drawer.classList.remove("closed");

        drawerOpened = true;
    }
    function closeDrawer(e) {
        if (!drawerOpened) return;

        drawer.style.transition = `all ${velocityToTransition(Math.abs(e.velocityX))}s ease-in-out`;

        drawer.classList.add("closed");
        drawer.classList.remove("open");

        drawerOpened = false;
    }
    function toggleDrawer() {
        if (drawerOpened)
            closeDrawer();
        else
            openDrawer();

    }

    async function init() {
        drawerSpan = getById("drawer-span");
        drawer = getById("drawer-wrapper");
        doc = document.body;

        drawerSpanTouch = new Hammer(drawerSpan);
        docTouch = new Hammer(doc);

        drawerSpanTouch.on("swiperight", openDrawer);
        docTouch.on("swipeleft", closeDrawer);
    }

    async function remove() {

    }

    const lifeCycle = {
        willRender: () => { },
        render: () => HTML,
        didRender: init,
        unMount: remove
    }
    return lifeCycle;
}