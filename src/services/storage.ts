import { IFactory } from "../types";
import { IKitsuAnime } from "./kitsu";

interface IIStorageMethods {
  getSingle: () => Promise<IKitsuAnime>;
  getMany: () => Promise<Array<IKitsuAnime>>;
  addSingle: (anime: IKitsuAnime) => Promise<void>;
}

interface IStorage extends IFactory {
  create: () => Readonly<IIStorageMethods>;
}

const Storage: IStorage = {
  create: () => {
    const storage_key = "app__storage__saved__animes";

    let index = 0;

    const getCurrentAnimes: () => Array<IKitsuAnime> = () =>
      JSON.parse(localStorage.getItem(storage_key)) || [];

    const fetchAnime = async (): Promise<any> => {
      return getCurrentAnimes();
    };

    const addSingle: (anime: IKitsuAnime) => Promise<void> = async (anime) => {
      const currentAnimes = getCurrentAnimes();

      const exists = Boolean(
        currentAnimes.filter((existentAnime) => existentAnime.id === anime.id)
          .length
      );

      if (exists) return;

      const newAnimes = [anime, ...currentAnimes];
      localStorage.setItem(storage_key, JSON.stringify(newAnimes));
    };

    const getSingle: () => Promise<IKitsuAnime> = async () => {
      const anime = await fetchAnime()[index];

      index++;

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
      addSingle,
    };

    return Object.freeze(self);
  },
};

export default Storage;
