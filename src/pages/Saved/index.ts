import lodash from "lodash";
import { IComponent as ISavedPage } from "../../types";

import WrapperFactory from "../../components/Wrapper";
import CardFactory from "../../components/Card";

import StorageFactory from "../../services/storage";

const SavedPage: ISavedPage = {
  create: () => {
    const storage = StorageFactory.create();

    const Wrapper = WrapperFactory.create();
    let WrapperAPI = null;

    const { body, documentElement: doc } = document;

    const hasScroll = () => body.scrollHeight > body.clientHeight;

    let hasMore = true;

    const loadMore = async () => {
      const animes = await storage.getMany();
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
      if (!hasScroll || !hasMore) return;

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

      while (!hasScroll() && hasMore) {
        await loadMore();
      }
      console.log(await storage.getMany());
      window.addEventListener("scroll", onScroll);
    };

    const destroy = async () => {
      window.removeEventListener("scroll", onScroll);
      Wrapper.destroy();
    };

    const self = {
      render,
      afterRender,
      destroy,
    };

    return Object.freeze(self);
  },
};

export default SavedPage;
