const public_path = process.env.PUBLIC_PATH === "/" ? "" : process.env.PUBLIC_PATH;

const defaultRoute = {
    render: () => { },
    willRender: () => { },
    didRender: () => { },
    unMount: () => { }
};

const Router = {
    routes: [],

    currentRoute: null,

    _publicRoute: public_path,

    get: function (r, userRoute = {}) {
        if (typeof userRoute === "function")
            userRoute = { render: userRoute };

        const route = Object.assign({}, { path: this._publicRoute + r, params: {} }, defaultRoute, userRoute);

        this.routes.push(route);
    },
    navigateTo: function (newRoute) {
        if (newRoute === this.currentRoute.path) return;

        this._setRoute(newRoute);
    },
    _unmontRoute: function (route) {
        console.log({
            desmontei: true,
            essaRota: route
        });
    },
    _renderRoute: function (route) {
        console.log({
            renderizei: true,
            essaRota: route
        });
    },
    _setRoute: function (newRoute) {
        const matchedRoute = this._matchRoute(newRoute);

        if (this.currentRoute) {
            if (matchedRoute.path === this.currentRoute.path) return
            else this._unmontRoute(this.currentRoute);
        }

        this.currentRoute = matchedRoute;

        this._renderRoute(this.currentRoute);
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
        const [_404Route] = this.routes.filter(r => (r.path === "*" || r.path === "/*"));

        return Object.assign(
            {},
            (matchedRoute || _404Route || defaultRoute),
            { params }
        );
    }
}

export default Router;