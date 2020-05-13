import "./styles.scss";
import { IComponent, IComponentMethods } from "../../types";
import { IKitsuAnime } from "../../services/kitsu";

interface ICard extends IComponent {
  create: (anime: IKitsuAnime) => Readonly<IComponentMethods>;
}

const Card: ICard = {
  create: ({ images: { original, small }, name, url, id }: IKitsuAnime) => {
    const render = async () => {
      const html = `
        <div role="link" id="${id}" class="card">
          <img 
            data-link="true"
            data-href="${url}"
            data-id="${id}"
            class="card__image" 
            src="${original}" 
            data-src="${small}" 
            data-srcset="${original} 2x, ${small} 1x" 
            alt="${name}" 
            draggable="false"
          >
          <div class="card__loading"></div>
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
