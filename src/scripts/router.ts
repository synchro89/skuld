import { IFactory, IComponentMethods } from "../types";
import root from "./root";

export interface IRouterConfig {
  basePath: string;
}

export interface IRouterProps {
  path: string;
  component: Readonly<IComponentMethods>;
}

export interface IRouterMethods {
  initialize: (userConfig: IRouterConfig) => void;
  get: (userProps: IRouterProps) => void;
  navigateTo: (path: string) => void;
}

export interface IRouter extends IFactory {
  create: (userConfig: IRouterConfig) => Readonly<IRouterMethods>;
}

const Router: IRouter = {
  create: (userRouterConfig: IRouterConfig) => {
    const defaultRouterConfig: IRouterConfig = {
      basePath: "/",
    };

    const { basePath } = Object.assign(
      {},
      defaultRouterConfig,
      userRouterConfig
    );

    const routes: Array<IRouterProps> = [];

    let currentRoute: IRouterProps | null = null;

    const matchRoute = (path: string) => {
      return routes.filter((route) => route.path === path)[0];
    };

    const setCurrentRoute = async (path: string) => {
      const route = matchRoute(path);

      await currentRoute.component.destroy();

      await renderRoute(route);
    };

    const renderRoute = async ({ component }: IRouterProps) => {
      root.innerHTML = await component.render();
      await component.afterRender();
    };

    const initialize = () => {
      const initialRoute = matchRoute(window.location.pathname);
      renderRoute(initialRoute);
      window.onpopstate = () => setCurrentRoute(window.location.pathname);
    };

    const get = (routeProps: IRouterProps) => {
      routes.push({
        ...routeProps,
        path: basePath + routeProps.path,
      });
    };

    const navigateTo = (path) => {
      setCurrentRoute(basePath + path);
    };

    const self = {
      initialize,
      get,
      navigateTo,
    };

    return Object.freeze(self);
  },
};

export default Router;
