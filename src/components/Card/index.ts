import "./styles.scss";
import { IComponent, IComponentMethods } from "../../types";
import { IKitsuAnime } from "../../services/kitsu";

interface ICardMethods extends IComponentMethods {
  render: (anime: IKitsuAnime) => Promise<string>;
}

interface ICard extends IComponent {
  create: () => Readonly<ICardMethods>;
}

const Card: ICard = {
  create: () => {
    const render = async ({ imageURL, name, url }: IKitsuAnime) => {
      const html = `
          <a href="${url}" target="_blank"  class="card">
            <img class="card__image" src="${imageURL}" alt="${name}" />
          </a>
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
