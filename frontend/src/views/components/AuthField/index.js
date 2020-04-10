import "./styles.scss";

const defaultOptions = {
    type: "text",
    placeholder: "",
    name: "",
    label: "",
    id: null,
    autofocus: false,
    inject: "",
    icon: null
}

export default function AuthField(props) {
    const { userOptions = {} } = props;

    const {
        type,
        placeholder,
        name,
        label,
        id,
        autofocus,
        inject,
        icon
    } = Object.assign({}, defaultOptions, userOptions);

    const usePassword = type === "password";

    console.log(icon);
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
                    <span data-target="${id || name}" 
                        class="show_password pointer auth-input-wrapper__icon material-icons"
                    >visibility</span>` : ""}
            </div>
            ${inject}
        </div>
    `

    function initField() {
    }
    function removeField() {

    }

    const lifeCycle = {
        willRender: async () => { },
        render: async () => HTML,
        didRender: initField,
        unMount: removeField
    }

    return lifeCycle;
}