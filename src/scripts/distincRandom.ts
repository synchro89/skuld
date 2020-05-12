import { IFactory } from "../types";
import { random } from "../utils";

interface IDistincRandomMethods {
  generate: (min: number, max: number) => number;
}

interface IDistincRandom extends IFactory {
  create: () => Readonly<IDistincRandomMethods>;
}

const DistinctRandom: IDistincRandom = {
  create: () => {
    let unavailableNumbers: Array<number> = [];

    const generate = (min: number, max: number) => {
      if (unavailableNumbers.length === max)
        throw new Error("No more numbers available in this range");

      const num = random(min, max);

      while (unavailableNumbers.includes(num)) {
        return generate(min, max);
      }

      unavailableNumbers.push(num);

      return num;
    };

    const self = {
      generate,
    };

    return Object.freeze(self);
  },
};

export default DistinctRandom;
