import "./scss/app.scss";

// Package.json data
import packageData from "../package.json";

// Router Factory
import RouterFactory, { IRouterConfig } from "./scripts/router";

// Pages Factories
import HomePageFactory from "./pages/Home";
import SavedPageFactory from "./pages/saved";
import Page404Factory from "./pages/404";

(async () => {
  const HomePage = HomePageFactory.create();
  const SavedPage = SavedPageFactory.create();
  const Page404 = Page404Factory.create();

  const routerConfig: IRouterConfig = {
    basePath: new URL(packageData.homepage).pathname,
  };

  const Router = RouterFactory.create(routerConfig);

  Router.get({
    path: "/",
    component: HomePage,
  });

  Router.get({
    path: "/saved",
    component: SavedPage,
  });

  Router.get({
    path: "/*",
    component: Page404,
  });

  Router.initialize();
})();
