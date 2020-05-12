// Interface for any Factory
export interface IFactory {
  create: (config?: object) => Readonly<object>;
}

// Interface for HTML Components that works as Factory
export interface IComponentMethods {
  render: (props?: object) => string;
  afterRender: () => any;
  destroy: () => void;
}

export interface IComponent extends IFactory {
  create: () => Readonly<IComponentMethods>;
}
