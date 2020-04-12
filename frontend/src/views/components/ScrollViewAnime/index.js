import "./styles.scss";

export default function ScrollViewAnime() {

    const HTML = `
        <div class="scroll-view-a">

        </div>
    `;

    async function init() { }
    async function remove() { }

    const lifeCycle = {
        willRender: async () => { },
        render: async () => HTML,
        didRender: init,
        unMount: remove
    }

    return lifeCycle;
}