export default function ScrollViewAnimeItem() {

    const HTML = ``;

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