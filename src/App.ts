import "./scss/app.scss";
import packageData from "../package.json";
import RouterFactory, { IRouterConfig } from "./scripts/router";

(async () => {
  const routerConfig: IRouterConfig = {
    baseName: new URL(packageData.homepage).pathname,
  };

  const Router = RouterFactory.create(routerConfig);

  Router.get("/", () => {
    console.log("Página Home");
  });

  Router.get("/saved", () => {
    console.log("Página de animes salvos");
  });
})();
