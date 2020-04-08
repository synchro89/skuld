import "./styles.scss";

function setAttributes(node, attributes) {
    Object.keys(attributes).forEach((key) => {
        node.style[key] = attributes[key];
    });
}

function tap(config) {
    const { container, x, y } = config;

    this.tap = document.createElement("span");
    this.tap.addEventListener("pointerdown", e => {
        e.stopPropagation();

        const wrapperData = container.getBoundingClientRect();

        new tap({
            container,
            x: e.pageX - 20,
            y: (e.pageY - wrapperData.top)
        });
    });

    container.appendChild(this.tap);

    setAttributes(this.tap, {
        left: x + "px",
        top: y + "px"
    });

    this.tap.classList.add("ripple__init");

    setTimeout(() => {

        this.tap.classList.add("ripple__running");

        setTimeout(() => {
            this.tap.classList.add("ripple__finally");

            setTimeout(() => {
                container.removeChild(this.tap);
            }, 600);

        }, 250);
    }, 1);
}

function initRipple(e) {
    new tap({
        container: this.wrapper,
        x: e.layerX,
        y: e.layerY,
    });
}

function remove(initFunction) {
    return () =>
        this.wrapper.removeEventListener("pointerdown", initFunction);
}

function Ripple(wrapper) {
    const initRippleFunction = initRipple.bind(this);

    this.wrapper = wrapper;

    this.wrapper.addEventListener("pointerdown", initRippleFunction);

    return remove.apply(this, [initRippleFunction]);
}

export default Ripple;