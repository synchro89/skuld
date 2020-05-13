import "./styles.scss";
import { IComponent, IComponentMethods } from "../../types";
import { getId } from "../../utils";

interface IWrapperAPI {
  node: HTMLElement;
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
            <div class="wrapper__loading-container">
              <div class="wrapper__loading-dot dot-1"></div>
              <div class="wrapper__loading-dot dot-2"></div>
              <div class="wrapper__loading-dot dot-3"></div>
            </div>
          </main>
      `;
      return html;
    };

    const afterRender = async () => {
      const node: HTMLElement = document.querySelector(
        `#${id} .wrapper__container`
      );

      const add = (html: string) => {
        node.innerHTML += html;
      };

      node.addEventListener("click", (e) => {
        const Card: any = e.target;

        window.open(Card.getAttribute("data-href"), "_blank");
      });
      const API: IWrapperAPI = {
        node,
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
