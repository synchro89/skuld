import "./styles.scss";

export default function Wrapper(Component) {

    const {
        willRender,
        render,
        didRender,
        unMount
    } = Component;

    const HTML = `
        <div class="wrapper">
            ${render()}
        </div>
    `;

    const lifeCycle = {
        willRender,
        render: async () => HTML,
        didRender,
        unMount
    }
    return lifeCycle;
}