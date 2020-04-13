import Drawer from "../Drawer";

export default async function Layout(Content) {

    const drawer = Drawer();

    const HTML = `
        ${await drawer.render()}
        ${await Content}
    `

    const lifeCycle = {
        willRender: () => {
            drawer.willRender();
            return {
                drawer
            }
        },
        render: () => HTML,
        didRender: () => {
            drawer.didRender();
        },
        unMount: () => {
            drawer.unMount();
        }
    }

    return lifeCycle;
}