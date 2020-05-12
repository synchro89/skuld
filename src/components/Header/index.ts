import "./styles.scss";
import { IComponent as IHeader } from "../../types";

const Header: IHeader = {
  create: () => {
    const render = async () => {
      const html = `
          <main class="wrapper">
            <div class="wrapper__container"></div>
          </main>
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

export default Header;
