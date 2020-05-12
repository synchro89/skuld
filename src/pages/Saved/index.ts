import { IComponent, IComponentMethods } from "../../types";

interface ISavedPageMethods extends IComponentMethods {}

interface ISavedPage extends IComponent {
  create: () => Readonly<ISavedPageMethods>;
}

const SavedPage: ISavedPage = {
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

export default SavedPage;
