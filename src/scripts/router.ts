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
  initialize: () => void;
  get: (userProps: IRouterProps) => void;
  navigateTo: (path: string) => void;
}

export interface IRouter extends IFactory {
  create: (userConfig?: IRouterConfig) => Readonly<IRouterMethods>;
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

    const getWindowPath = () => {
      const path = window.location.pathname;

      const endsWithLetter = /[a-z]$/i.test(path);

      return path + (endsWithLetter ? "/" : "");
    };

    const matchRoute = (path: string) => {
      return (
        routes.filter((route) => route.path === path)[0] ||
        routes.filter((route) => route.path === basePath + "/*/")[0]
      );
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

    const initialize = async () => {
      const initialRoute = matchRoute(getWindowPath());
      await renderRoute(initialRoute);
      window.onpopstate = async () => await setCurrentRoute(getWindowPath());
    };

    const get = (routeProps: IRouterProps) => {
      const path =
        basePath + routeProps.path + (routeProps.path === "/" ? "" : "/");

      routes.push({
        ...routeProps,
        path,
      });
    };

    const navigateTo = (path: string) => {
      path = basePath + path;
      history.pushState({}, path, path);
      setCurrentRoute(path);
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
