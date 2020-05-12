import { IComponent, IComponentMethods } from "../../types";

interface IHomePageMethods extends IComponentMethods {}

interface IHomePage extends IComponent {
  create: () => Readonly<IHomePageMethods>;
}

const IHomePage: IHomePage = {
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

export default IHomePage;
