import "./styles.scss";

import { query } from "../../../scripts/utils";

import Ripple from "../../../scripts/ripple";

const defaultConfig = {
    onClick: () => { },
    label: "Submit"
}

export default function AuthSubmit({ config: userConfig }) {

    const { label, onClick } = Object.assign({}, defaultConfig, userConfig);

    const HTML = `
        <button loading="false" class="auth-submit" type="submit">${label}</button>
    `
    const loadingHTML = `
        <div class="auth-submit__loader" data-delay="0"></div>
        <div class="auth-submit__loader" data-delay="1"></div>
        <div class="auth-submit__loader" data-delay="2"></div>
    `

    let buttonSubmit = null;

    let removeRipple = null;

    const api = {
        loading: false,
        setLoading: function (state) {
            if (state === buttonSubmitIsLoading()) return;

            toggleButtonSubmitState();
            this.loading = state;
        }
    }

    function enableRipple() {
        removeRipple = new Ripple(buttonSubmit, {
            color: "var(--tap)",
            size: 5
        });
    }
    function buttonSubmitIsLoading() {
        return buttonSubmit.getAttribute("loading") === "true";
    }
    function toggleRipple() {
        if (buttonSubmitIsLoading())
            enableRipple();
        else
            removeRipple();
    }

    function toggleButtonSubmitState() {
        if (buttonSubmitIsLoading()) {

            buttonSubmit.innerHTML = `Login`;

            toggleRipple();

            buttonSubmit.removeAttribute("disabled")
            buttonSubmit.setAttribute("loading", "false");
        } else {
            buttonSubmit.innerHTML = loadingHTML;

            toggleRipple();

            buttonSubmit.setAttribute("disabled", "true");
            buttonSubmit.setAttribute("loading", "true");
        }
    }
    async function init() {
        buttonSubmit = query(".auth-submit");
        buttonSubmit.onclick = onClick;
        enableRipple();
        return api;
    }
    async function remove() {
    }


    const lifeCycle = {
        willRender: async () => { },
        render: async () => HTML,
        didRender: init,
        unMount: remove
    }

    return lifeCycle;
}