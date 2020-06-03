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

    const { body, documentElement: doc } = document;

    const hasScroll = () => body.scrollHeight > body.clientHeight * 2;

    let hasMore = true;

    const loadMore = async () => {
      const animes = await kitsu.getMany();
      if (animes.length === 0) {
        hasMore = false;
        return;
      }
      if (animes.length < 10) {
        hasMore = false;
      }

      await new Promise((resolve) => {
        animes.forEach(async (anime, i) => {
          const Card = await CardFactory.create(anime);

          const CardHTML = await Card.render();

          WrapperAPI.add(CardHTML);

          await Card.afterRender();

          if (i === animes.length - 1) resolve();
        });
      });
    };

    const onScroll = lodash.throttle(() => {
      if (!hasScroll) return;

      const value =
        (100 * doc.scrollTop) / (doc.scrollHeight - doc.clientHeight);

      if (value >= 50) loadMore();
    }, 1000);

    const render = async () => {
      const html = `
        ${await Wrapper.render()}
      `;

      return html;
    };
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
