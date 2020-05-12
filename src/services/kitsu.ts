import axios from "axios";
import DistincRandomFactory from "../scripts/distincRandom";
import { IFactory } from "../types";

interface IKitsuAnime {
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

        if (response.status === 404) return await fetchAnime();

        return response;
      } catch (error) {
        throw error;
      }
    };

    const getSingle = async () => {
      const {
        data: {
          attributes: {
            posterImage: { original: imageURL },
            slug,
            canonicalTitle: name,
          },
        },
      } = await fetchAnime();

      return {
        name,
        imageURL,
        url: `https://kitsu.io/anime/${slug}`,
      };
    };
    const getMany = async () => {
      return [
        {
          name: "",
          url: "",
          imageURL: "",
        },
      ];
    };

    const self = {
      getSingle,
      getMany,
    };

    return Object.freeze(self);
  },
};

export default Kitsu;
