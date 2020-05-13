import { IFactory } from "../types";
import { random } from "../utils";

interface IDistincRandomMethods {
  generate: () => number;
}

interface IDistincRandom extends IFactory {
  create: (range: {
    min: number;
    max: number;
  }) => Readonly<IDistincRandomMethods>;
}

const DistinctRandom: IDistincRandom = {
  create: ({ min, max }) => {
    let unavailableNumbers: Array<number> = [];

    const generate = () => {
      if (unavailableNumbers.length === max)
        throw new Error("No more numbers available in this range");

      const num = random(min, max);

      while (unavailableNumbers.includes(num)) {
        return generate();
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
