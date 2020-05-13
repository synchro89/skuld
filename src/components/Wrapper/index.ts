import "./styles.scss";
import { IComponent, IComponentMethods } from "../../types";
import { getId } from "../../utils";

interface IWrapperAPI {
  getNode: () => HTMLElement;
  add: (html: string) => void;
}

interface IWrapperMethods extends IComponentMethods {
  afterRender: () => Promise<IWrapperAPI>;
}

interface IWrapper extends IComponent {
  create: () => Readonly<IWrapperMethods>;
}

const Wrapper: IWrapper = {
  create: () => {
    const id = getId();

    const render = async () => {
      const html = `
          <main id="${id}" class="wrapper">
            <div class="wrapper__container"></div>
          </main>
      `;
      return html;
    };

    const afterRender = async () => {
      const getNode: () => HTMLElement = () =>
        document.querySelector(`#${id} .wrapper__container`);

      const add = (html: string) => {
        getNode().innerHTML += html;
      };

      const API: IWrapperAPI = {
        getNode,
        add,
      };

      return API;
    };

    const destroy = async () => {};

    const self = {
      render,
      afterRender,
      destroy,
    };

    return Object.freeze(self);
  },
};

export default Wrapper;
