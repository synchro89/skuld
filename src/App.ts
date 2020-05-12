import "./scss/app.scss";
import packageData from "../package.json";
import RouterFactory, { IRouterConfig } from "./scripts/router";

(async () => {
  const routerConfig: IRouterConfig = {
    basePath: new URL(packageData.homepage).pathname,
  };

  const Router = RouterFactory.create(routerConfig);

  Router.get({
    path: "/",
    component: {
      render: () => "To na página /",
      afterRender: () => {},
      destroy: () => {},
    },
  });

  Router.get({
    path: "/saved",
    component: {
      render: () => "To na página /saved",
      afterRender: () => {},
      destroy: () => {},
    },
  });

  Router.initialize();
})();
