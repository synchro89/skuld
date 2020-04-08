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

    _publicPath: public_path,

    _publicRoute: null,
    _privateRoute: null,

    prev: function () {
        window.history.back(1);
    },
    next: function () {
        window.history.go(1);
    },
    navigateTo: function (newRoute) {
        newRoute = this._publicPath + newRoute;

        if (this.currentRoute && newRoute === this.currentRoute.path) return;

        this._setRoute(newRoute);
    },
    _unmontRoute: function (route) {
        route.unMount(this.currentRoute.props);
    },
    _renderRoute: async function (route, props) {
        this.currentRoute = route;

        this.currentRoute.props = props;

        this.currentRoute.props.lifeCycle = {};

        this.currentRoute.props.lifeCycle.willRenderProps = await route.willRender(this.currentRoute.props);

        this.currentRoute.props.lifeCycle.renderProps = await route.render(this.currentRoute.props);

        this.currentRoute.props.lifeCycle.didRender = await route.didRender(this.currentRoute.props);
    },
    _equalRoutes: function (route, otherRoute) {
        return route.path === otherRoute.path;
    },
    _unMountAndRenderThis: function (unMountThisRoute, renderThisRoute, props = { params: {} }) {
        this._unmontRoute(unMountThisRoute);
        this._renderRoute(renderThisRoute, props);
    },
    _pushState: function (state, path) {
        window.history.pushState(state, path, path);
    },
    _setRoute: function (newRoute) {
        const firstRender = !this.currentRoute;

        const matchedRoute = this._matchRoute(newRoute);

        const isAuth = Auth.isAuth();

        const allowedAccessTypes = isAuth ?
            [access_types.ANY, access_types.PRIVATE_ONLY] :
            [access_types.ANY, access_types.PUBLIC_ONLY];

        const routeToRedirect = isAuth ? this._privateRoute : this._publicRoute;

        if (!firstRender) {
            if (
                !allowedAccessTypes.includes(this.currentRoute.access) ||
                !allowedAccessTypes.includes(matchedRoute.access)
            ) {
                this.navigateTo(routeToRedirect.path);
                return;
            }
        } else {
            if (
                !allowedAccessTypes.includes(matchedRoute.access)
            ) {
                this.navigateTo(routeToRedirect.path);
                return;
            }
        }
        const props = {
            params: (this.currentRoute ? this.currentRoute.params : {})
        }

        if (!firstRender && this._equalRoutes(this.currentRoute, matchedRoute))
            return;

        this._pushState(props, matchedRoute.path);

        if (firstRender)
            return this._renderRoute(matchedRoute, props);

        this._unMountAndRenderThis(this.currentRoute, matchedRoute, props);
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
    },
    get: function (r, userRoute = {}) {
        if (typeof userRoute === "function")
            userRoute = { render: userRoute };

        const route = Object.assign({}, { path: this._publicPath + r, params: {} }, defaultRoute, userRoute);

        this.routes.push(route);
    },
    configure: function (config) {
        const {
            redirectWhenNotAuth: publicPath,
            redirectWhenAuth: privatePath
        } = config;

        if (publicPath) {
            const [publicRoute] = this.routes.filter(item => item.path === publicPath);
            if (!publicRoute) throw new Error("Redirect routes must be defined on get method");
            this._publicRoute = publicRoute;
        }
        if (privatePath) {
            const [privateRoute] = this.routes.filter(item => item.path === privatePath);
            if (!privateRoute) throw new Error("Redirect routes must be defined on get method");
            this._privateRoute = privateRoute;
        }
    },
    init: async function () {
        if (!window) return;

        // USER LOADING = TRUE
        await Auth.init();

        Auth.on(
            Auth.events.AUTH_STATE_CHANGE,
            () => this._setRoute(window.location.pathname)
        );

        if (Auth.isAuth()) {
            console.log("usuario logado:");
            console.log(Auth.userData);
        } else {
            console.log("usuario nao logado:");
        }
        // USER LOADING = FALSE

        console.log(window.location.pathname);
        this._setRoute(window.location.pathname);

        window.addEventListener("popstate", () => this._setRoute(window.location.pathname));
    },
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