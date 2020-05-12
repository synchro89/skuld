// Interface for any Factory
export interface IFactory {
  create: () => Readonly<object>;
}

// Interface for HTML Components that works as Factory
export interface IComponentMethods {
  render: (props: object | undefined) => string;
  afterRender: () => any;
  destroy: () => void;
}

export interface IComponent extends IFactory {
  create: () => Readonly<IComponentMethods>;
}
