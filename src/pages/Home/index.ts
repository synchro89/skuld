import { IComponent as IHomePage } from "../../types";

const HomePage: IHomePage = {
  create: () => {
    const render = () => {
      const html = ``;
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

export default HomePage;
