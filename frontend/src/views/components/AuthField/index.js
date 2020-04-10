import "./styles.scss";

import { getById, query } from "../../../scripts/utils";

const defaultConfig = {
    type: "text",
    placeholder: "",
    name: "",
    label: "",
    id: null,
    autofocus: false,
    inject: "",
    icon: null,
    onInput: () => { }
}

export default function AuthField({ config: userConfig }) {

    const {
        type,
        placeholder,
        name,
        label,
        id,
        autofocus,
        inject,
        icon,
        onInput
    } = Object.assign({}, defaultConfig, userConfig);

    const usePassword = type === "password";

    const HTML = `
        <div class="auth-wrapper__field">
            <label 
                class="auth-wrapper__label auth-wrapper__label--as-wrapper" 
                ${id ? `for="${id}"` : ""}
            >
                ${label.toUpperCase()}
            </label>
            <div class="auth-input-wrapper">
                ${icon ? `<span class="auth-input-wrapper__icon material-icons">${icon}</span>` : ""}
                <input class="auth-input-wrapper__input" id="${id}" type="${type}" name="${name}"
                    placeholder="${placeholder}" ${autofocus ? `autofocus` : ""}>
                ${usePassword ? `
                    <span id="show_password" data-target="${id || name}" 
                        class="pointer auth-input-wrapper__icon material-icons"
                    >visibility</span>` : ""}
            </div>
            ${inject}
        </div>
    `

    async function init() {
        const input = !!id ? getById(id) : query(`.auth-wrapper__field input[name='${name}']`);

        usePassword && initShowPass(input);

        input.oninput = onInput;
    }
    async function remove() {

    }

    function initShowPass(inputTarget) {
        const showPass = getById("show_password");

        showPass.onclick = function () {
            const newType = inputTarget.getAttribute("type") === "password" ? "text" : "password";
            const newIcon = newType === "password" ? "visibility" : "visibility_off"
            inputTarget.setAttribute("type", newType);
            showPass.textContent = newIcon;
        }
    }

    const lifeCycle = {
        willRender: async () => { },
        render: async () => HTML,
        didRender: init,
        unMount: remove
    }

    return lifeCycle;
}