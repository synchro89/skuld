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

    const fetchAnime = async (): Promise<object> => {
      try {
        const response = await axios.get(baseURL + getRandomNumber());
        console.log(response);
        return response;
      } catch (error) {
        throw error;
      }
    };

    const getSingle = async () => {
      const anime = await fetchAnime();

      return {
        name: "",
        url: "",
        imageURL: "",
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
