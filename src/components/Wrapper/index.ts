import "./styles.scss";
import Touch from "hammerjs";
import { IComponent, IComponentMethods } from "../../types";
import { getId } from "../../utils";
import Storage from "../../services/storage";
import { IKitsuAnime } from "../../services/kitsu";

interface IWrapperAPI {
  Node: HTMLElement;
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
    const storage = Storage.create();
    let NodeTouch = null;

    const getNode: () => HTMLElement = () =>
      document.querySelector(`#${id} .wrapper__container`);

    const onClick = (e: Event) => {
      const Card: any = e.target;

      window.open(Card.getAttribute("data-href"), "_blank");
    };

    const onPress = (e: Event) => {
      const Card: any = e.target;

      const anime: IKitsuAnime = {
        images: {
          original: Card.getAttribute("src"),
          small: Card.getAttribute("data-src"),
        },
        name: Card.getAttribute("alt"),
        url: Card.getAttribute("data-href"),
        id: Card.getAttribute("data-id"),
      };

      storage.addSingle(anime);

      alert("added");
    };

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
      const Node: HTMLElement = getNode();

      const add = (html: string) => {
        Node.innerHTML += html;
      };

      NodeTouch = new Touch(Node);

      NodeTouch.on("tap", onClick);
      NodeTouch.on("press", onPress);

      const API: IWrapperAPI = {
        Node,
        add,
      };

      return API;
    };

    const destroy = async () => {
      NodeTouch.off("tap", onClick);
      NodeTouch.off("press", onPress);
    };

    const self = {
      render,
      afterRender,
      destroy,
    };

    return Object.freeze(self);
  },
};

export default Wrapper;
