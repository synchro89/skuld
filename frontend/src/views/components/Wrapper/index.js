import "./styles.scss";

export default async function Wrapper(Component) {

    const {
        willRender,
        render,
        didRender,
        unMount
    } = Component;

    const HTML = `
        <div class="wrapper">
            <div class="wrapper__container">
                ${await render()}
            </div>
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