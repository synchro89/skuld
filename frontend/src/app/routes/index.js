import Auth from "../auth";

const public_path = process.env.PUBLIC_PATH === "/" ? "" : process.env.PUBLIC_PATH;

const access_types = {
    PUBLIC_ONLY: "public_only",
    PRIVATE_ONLY: "private_only",
    ANY: "any"
}

const defaultRoute = {
    render: () => { },
    willRender: () => { },
    didRender: () => { },
    unMount: () => { },
    access: access_types.ANY
};

const Router = {
    routes: [],

    currentRoute: null,

    _publicRoute: public_path,

    _config: null,

    get: function (r, userRoute = {}) {
        if (typeof userRoute === "function")
            userRoute = { render: userRoute };

        const route = Object.assign({}, { path: this._publicRoute + r, params: {} }, defaultRoute, userRoute);

        this.routes.push(route);
    },
    prev: function () {
        window.history.back(1);
    },
    next: function () {
        window.history.go(1);
    },
    navigateTo: function (newRoute) {
        newRoute = this._publicRoute + newRoute;

        if (newRoute === this.currentRoute.path) return;

        this._setRoute(newRoute);

        window.history.pushState({}, newRoute, newRoute);
    },
    _unmontRoute: function (route) {
        route.unMount();
    },
    _renderRoute: function (route, props) {
        route.willRender(props);
        route.render(props);
        route.didRender(props);
    },
    _setRoute: function (newRoute) {
        const matchedRoute = this._matchRoute(newRoute);

        if (this.currentRoute) {
            if (matchedRoute.path === this.currentRoute.path) return;
            else this._unmontRoute(this.currentRoute);
        }

        this.currentRoute = matchedRoute;

        const props = {
            params: this.currentRoute.params
        }

        this._renderRoute(this.currentRoute, props);
    },
    init: async function () {
        if (!window) return;

        let loadingUser = true;

        await this.auth.init();

        Auth.on(Auth.events.AUTH_STATE_CHANGE, () => {
            this._setRoute(window.location.pathname);
        });

        if (Auth.isAuth()) {
            console.log("usuario logado:");
            console.log(Auth.userData);
        } else {
            console.log("usuario nao logado:");
        }
        loadingUser = false;

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

        const [_404Route] = [Object.assign(
            {},
            this.routes.filter(r => (r.path === "*" || r.path === "/*"))[0],
            {
                path: route
            }
        )];

        return Object.assign(
            {},
            (matchedRoute || _404Route || defaultRoute),
            { params }
        );
    }
}

function privateRoute(route) {
    if (typeof route === "function")
        route = { render: route }

    route.access = access_types.PRIVATE_ONLY

    return Object.assign({}, defaultRoute, route);
}


function publicRoute(route) {
    if (typeof route === "function")
        route = { render: route }

    route.access = access_types.PUBLIC_ONLY

    return Object.assign({}, defaultRoute, route);
}

export {
    privateRoute,
    publicRoute,
    access_types
}

export default Router;