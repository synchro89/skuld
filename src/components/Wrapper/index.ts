import { IComponent } from "../../types";

const Wrapper: IComponent = {
  create: () => {
    const render = () => {
      const html = `
            <main class="wrapper"></main>
        `;
      return html;
    };

    const afterRender = () => {};

    const destroy = () => {};

    const self = {
      render,
      afterRender,
      destroy,
    };

    return Object.freeze(self);
  },
};

export default Wrapper;
