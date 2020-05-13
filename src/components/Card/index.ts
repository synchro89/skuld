import "./styles.scss";
import { IComponent, IComponentMethods } from "../../types";
import { IKitsuAnime } from "../../services/kitsu";
import { getId } from "../../utils";

interface ICard extends IComponent {
  create: (anime: IKitsuAnime) => Readonly<IComponentMethods>;
}

const Card: ICard = {
  create: ({ images: { original, small }, name, url }: IKitsuAnime) => {
    const id = getId();

    const render = async () => {
      const html = `
          <div role="link" id="${id}" class="card">
            <img 
              data-href="${url}"
              class="card__image" 
              src="${original}" 
              data-src="${small}" 
              data-srcset="${original} 2x, ${small} 1x" 
              alt="${name}" 
            >
          </div>
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

export default Card;
