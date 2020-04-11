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
            <div id="auth-input-wrapper-${id}" class="auth-input-wrapper">
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

    let input = null;
    let labelInput = null;
    let inputWrapper = null;

    const labelClassError = "auth-wrapper__label--error";
    const inputWrapperClassFocus = "auth-input-wrapper--focus-here";
    const inputWrapperClassError = "auth-input-wrapper--error";
    const inputWrapperClassSuccess = "auth-wrapper__label--success";

    const api = {
        error: false,
        getValue: function () {
            return input.value;
        },
        heyHere: function () {
            if (inputWrapper.classList.contains(inputWrapperClassFocus)) return;

            inputWrapper.classList.add(inputWrapperClassFocus);
        },
        clear: function () {
            if (!labelInput.classList.contains(labelClassError)) return;

            this.error = false;

            labelInput.classList.remove(labelClassError);
            inputWrapper.classList.remove(inputWrapperClassError);
            inputWrapper.classList.remove(inputWrapperClassSuccess);
            labelInput.textContent = label.toUpperCase();
        },
        setCorrect: function () {
            if (inputWrapper.classList.contains(inputWrapperClassSuccess)) return;

            this.error = false;

            labelInput.classList.add(labelClassError);
            labelInput.textContent = labelInput.textContent + " - " + message;

            inputWrapper.classList.remove(inputWrapperClassError);
            inputWrapper.classList.add(inputWrapperClassSuccess);
        },
        setError: function (message) {
            if (inputWrapper.classList.contains(inputWrapperClassError)) return;

            this.error = true;

            labelInput.classList.add(labelClassError);
            labelInput.textContent = labelInput.textContent + " - " + message;

            inputWrapper.classList.remove(inputWrapperClassSuccess);
            inputWrapper.classList.add(inputWrapperClassError);
        }
    }

    async function init() {
        input = !!id ? getById(id) : query(`.auth-wrapper__field input[name='${name}']`);
        labelInput = query(`.auth-wrapper__field label[for='${id || name}']`);
        inputWrapper = getById(`auth-input-wrapper-${id}`);

        inputWrapper.addEventListener("animationend", () => {
            inputWrapper.classList.remove(inputWrapperClassFocus);
        });

        usePassword && initShowPass(input);

        input.oninput = e => {
            api.clear();
            onInput(e.target.value, api);
        };

        return api;
    }
    async function remove() {

    }

    function initShowPass() {
        const showPass = getById("show_password");

        showPass.onclick = function () {
            const newType = input.getAttribute("type") === "password" ? "text" : "password";
            const newIcon = newType === "password" ? "visibility" : "visibility_off"
            input.setAttribute("type", newType);
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