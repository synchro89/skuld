import lodash from "lodash";
import HyperList from "hyperlist";
import { IComponent as IHomePage } from "../../types";

import WrapperFactory from "../../components/Wrapper";
import CardFactory from "../../components/Card";

import KitsuFactory from "../../services/kitsu";

const HomePage: IHomePage = {
  create: () => {
    const kitsu = KitsuFactory.create();

    const Wrapper = WrapperFactory.create();
    let WrapperAPI = null;

    const render = async () => {
      const html = `
        ${await Wrapper.render()}
      `;

      return html;
    };

    const { body, documentElement: doc } = document;

    const hasScroll = () => body.scrollHeight > body.clientHeight;

    const loadMore = async () => {
      const animes = await kitsu.getMany();
      animes.forEach(async (anime) => {
        const Card = await CardFactory.create(anime);

        const CardHTML = await Card.render();

        WrapperAPI.add(CardHTML);

        await Card.afterRender();
      });
    };

    const onScroll = lodash.throttle(() => {
      if (!hasScroll) return;

      const value =
        (100 * doc.scrollTop) / (doc.scrollHeight - doc.clientHeight);

      if (value >= 50) loadMore();
    }, 1000);

    const afterRender = async () => {
      WrapperAPI = await Wrapper.afterRender();

      while (!hasScroll()) {
        await loadMore();
      }
      window.addEventListener("scroll", onScroll);
    };

    const destroy = async () => {
      window.removeEventListener("scroll", onScroll);
    };

    const self = {
      render,
      afterRender,
      destroy,
    };

    return Object.freeze(self);
  },
};

export default HomePage;
