import axios from "axios";
import DistincRandomFactory from "../scripts/distinctRandom";
import { IFactory } from "../types";

export interface IKitsuAnime {
  name: string;
  url: string;
  id: string;
  images: {
    small: string;
    original: string;
  };
}

interface IKitsuMethods {
  getSingle: () => Promise<IKitsuAnime>;
  getMany: () => Promise<Array<IKitsuAnime>>;
}

interface IKitsu extends IFactory {
  create: () => Readonly<IKitsuMethods>;
}

const Kitsu: IKitsu = {
  create: () => {
    const distincRandom = DistincRandomFactory.create({
      min: 0,
      max: 14305,
    });

    const getRandomNumber: () => number = () => distincRandom.generate();

    const baseURL: string = "https://kitsu.io/api/edge/anime/";

    const fetchAnime = async (): Promise<any> => {
      try {
        const response = await axios.get(baseURL + getRandomNumber());

        return response;
      } catch (error) {
        if (error.response.status === 404) return await fetchAnime();

        throw error;
      }
    };

    const getSingle: () => Promise<IKitsuAnime> = async () => {
      const { data: response } = await fetchAnime();

      let anime = {
        name: null,
        url: null,
        id: null,
        images: {
          small: null,
          original: null,
        },
      };

      anime = {
        ...anime,
        name: response.data.attributes.canonicalTitle,
        url: `https://kitsu.io/anime/${response.data.attributes.slug}`,
        id: response.data.id.toString(),
      };

      try {
        anime.images.original = response.data.attributes.posterImage.original;
        anime.images.small = response.data.attributes.posterImage.small;
      } catch (error) {
        anime.images.original =
          "https://kitsu.io/images/default_poster-8b947e02540d2b5053792748d7de269e.jpg";
        anime.images.small =
          "https://kitsu.io/images/default_poster-8b947e02540d2b5053792748d7de269e.jpg";
      }

      return anime;
    };
    const getMany: () => Promise<Array<IKitsuAnime>> = async () => {
      const animes = await Promise.all(
        Array.from({ length: 10 }).map(() => getSingle())
      );
      return animes;
    };

    const self = {
      getSingle,
      getMany,
    };

    return Object.freeze(self);
  },
};

export default Kitsu;
