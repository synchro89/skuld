import { IComponent as IHomePage } from "../../types";

import WrapperFactory from "../../components/Wrapper";

import KitsuFactory from "../../services/kitsu";

const HomePage: IHomePage = {
  create: () => {
    const kitsu = KitsuFactory.create();
    const Wrapper = WrapperFactory.create();

    const render = async () => {
      const html = `
        ${await Wrapper.render()}
      `;

      return html;
    };

    const afterRender = async () => {};

    const destroy = async () => {};

    const self = {
      render,
      afterRender,
      destroy,
    };

    return Object.freeze(self);
  },
};

export default HomePage;
