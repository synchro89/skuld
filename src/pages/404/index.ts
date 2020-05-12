import { IComponent as I404Page } from "../../types";

const Page404: I404Page = {
  create: () => {
    const render = () => {
      const html = `<h1>Error, not found :(</h1>`;
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

export default Page404;
