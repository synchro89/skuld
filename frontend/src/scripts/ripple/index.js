import "./styles.scss";

function setAttributes(node, attributes) {
    Object.keys(attributes).forEach((key) => {
        node.style[key] = attributes[key];
    });
}

function tap(config) {
    const { container, x, y, color, size } = config;

    this.tap = document.createElement("span");

    container.appendChild(this.tap);

    setAttributes(this.tap, {
        left: x + "px",
        top: y + "px",
        background: color,
        width: size + "px",
        height: size + "px"
    });

    this.tap.classList.add("ripple__tap");

    setTimeout(() => {
        container.removeChild(this.tap);
    }, 1000);
}

function initRipple(e, { color, size }) {
    new tap({
        container: this.wrapper,
        x: e.layerX,
        y: e.layerY,
        color,
        size
    });
}

function remove(initFunction) {
    return () =>
        this.container.removeEventListener("pointerdown", initFunction);
}

function Ripple(wrapper, options = { color: "var(--fallback)", size: 20 }) {
    const initRippleFunction = (e) => initRipple.apply(this, [e, options]);

    this.wrapper = wrapper;

    this.container = document.createElement("div");
    this.container.classList.add("ripple__container");

    this.wrapper.appendChild(this.container);

    this.container.addEventListener("pointerdown", initRippleFunction);

    return remove.apply(this, [initRippleFunction]);
}

export default Ripple;