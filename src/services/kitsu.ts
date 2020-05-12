import axios from "axios";

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
    const getSingle = async () => {
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
