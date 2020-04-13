import "./styles.scss";

import _ from "lodash";

import Hammer from "hammerjs";

import { query, isTouchDevice, interpolate } from "../../../scripts/utils";

export default function ScrollViewAnime(length) {

    const HTML = `
        <div class="scroll-view-a">
            <div class="scroll-view-a__container">
                <div style="margin: 0 4px; min-width: 350px; height: 350px; background: white;"></div>
                <div style="margin: 0 4px; min-width: 350px; height: 350px; background: white;"></div>
                <div style="margin: 0 4px; min-width: 350px; height: 350px; background: white;"></div>
                <div style="margin: 0 4px; min-width: 350px; height: 350px; background: white;"></div>
                <div style="margin: 0 4px; min-width: 350px; height: 350px; background: white;"></div>
                <div style="margin: 0 4px; min-width: 350px; height: 350px; background: white;"></div>
                <div style="margin: 0 4px; min-width: 350px; height: 350px; background: white;"></div>
                <div style="margin: 0 4px; min-width: 350px; height: 350px; background: white;"></div>
            </div>
        </div>
    `;

    let wrapper = null;
    let wrapperTouch = null;

    let currentX = 0;

    let last = null;

    async function init() {
        wrapper = query(".scroll-view-a__container");
        wrapperTouch = new Hammer(wrapper);

        if (isTouchDevice()) return;

        wrapper.style.transition = "all .3s ease-in-out";

        wrapperTouch.on("panleft", onPanLeft, 10);
        wrapperTouch.on("panright", onPanRight, 50);
        wrapperTouch.on("panend", onPanEnd, 10);

        console.log(wrapper.getBoundingClientRect());
        const xToLeft = interpolate([0, innerWidth], [0, wrapper.getBoundingClientRect().width]);

        function updateCurrentX() {
            currentX = wrapper.scrollLeft;
        }
        function onPanLeft(e) {
            if (last && last === "right") updateCurrentX();
            wrapper.scrollLeft = currentX + xToLeft(Math.abs(e.deltaX));
            last = "left";
        }
        function onPanRight(e) {
            if (last && last === "left") updateCurrentX();
            wrapper.scrollLeft = currentX - xToLeft(Math.abs(e.deltaX));
            last = "right";
        }
        function onPanEnd() {
            updateCurrentX();
        }
    }
    async function remove() { }

    const lifeCycle = {
        willRender: async () => { },
        render: async () => HTML,
        didRender: init,
        unMount: remove
    }

    return lifeCycle;
}