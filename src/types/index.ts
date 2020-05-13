// Interface for any Factory
export interface IFactory {
  create: (config?: object) => Readonly<object>;
}

// Interface for HTML Components that works as Factory
export interface IComponentMethods {
  render: (props?: object) => Promise<string>;
  afterRender: () => Promise<any>;
  destroy: () => Promise<void>;
}

export interface IComponent extends IFactory {
  create: (config?: object) => Readonly<IComponentMethods>;
}
