import axios from "axios";
import DistincRandomFactory from "../scripts/distinctRandom";
import { IFactory } from "../types";

export interface IKitsuAnime {
  name: string;
  url: string;
  imageURL: string;
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
    const DistincRandom = DistincRandomFactory.create();

    const getRandomNumber: () => number = () =>
      DistincRandom.generate(0, 14305);

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
      const response = await fetchAnime();

      const {
        data: {
          data: {
            attributes: {
              posterImage: { original: imageURL },
              slug,
              canonicalTitle: name,
            },
          },
        },
      } = response;
      console.log(response);
      return {
        name,
        imageURL,
        url: `https://kitsu.io/anime/${slug}`,
      };
    };
    const getMany: () => Promise<Array<IKitsuAnime>> = async () => {
      const animes = await Promise.all(
        Array.from({ length: 5 }).map(async () => {
          return getSingle();
        })
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
