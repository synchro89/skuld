const public_path = process.env.PUBLIC_PATH === "/" ? "" : process.env.PUBLIC_PATH;

const defaultRoute = {
    render: () => { },
    before: () => { },
    after: () => { },
    leave: () => { }
};

const Router = {
    routes: [],

    currentRoute: null,

    _publicRoute: public_path,

    _404: null,

    get: function (r, userRoute = {}) {
        if (typeof userRoute === "function")
            userRoute = { render: userRoute };

        const route = Object.assign({}, { path: this._publicRoute + r, params: {} }, defaultRoute, userRoute);

        if (r === "*") return this._404 = route;

        this.routes.push(route);
    },
    navigateTo: function (newRoute) {

    },
    _unmontRoute: function (route) {

    },
    _renderRoute: function (route) {
        console.log(route);
    },
    _setRoute: function (newRoute) {
        const matchedRoute = this._matchRoute(newRoute);

        if (!matchedRoute || matchedRoute.path !== this.currentRoute.path) {
            this._unmontRoute(this.currentRoute);
            if (!matchedRoute) this.currentRoute = this._404;
            else this.currentRoute = matchedRoute;
            this._renderRoute(this.currentRoute);
        }
    },
    init: function () {
        if (!window) return;

        this._setRoute(window.location.pathname);

        window.addEventListener("popstate", () => this._setRoute(window.location.pathname));
    },
    _matchRoute: function (route) {
        let params = {};

        const [matchedRoute] = this.routes.filter(r => {
            const rPaths = r.path.divide("/");
            const routePaths = route.divide("/");

            if (rPaths.length !== routePaths.length) return;

            let matched = true;
            for (let i = 0; i < rPaths.length; i++) {
                const currentRPath = rPaths[i];
                const currentRoutePath = routePaths[i];

                if (!currentRPath.startsWith(":"))
                    matched = currentRPath === currentRoutePath;
                else
                    params[currentRPath.replace(/[:]/g, "")] = currentRoutePath;

                if (!matched) break;
            }
            return matched;
        });

        if (!!matchedRoute) return Object.assign({}, matchedRoute, { params });
        else return null;
    }
}

export default Router;