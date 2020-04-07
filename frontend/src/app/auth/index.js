import backend from "../services/core/backend";

const storage_prefix = "skuld__app__access__token";

function isValidAuthorization(authorization) {
    if (!authorization)
        return false;

    const parts = authorization.split(" ");

    if (parts.length !== 2)
        return false;

    const [scheme, token] = parts;

    if (!/^Bearer$/.test(scheme))
        return false;

    return true;
}

const Auth = {
    userData: null,

    listeners: [],

    events: {
        AUTH_STATE_CHANGE: "auth_state_change",
        USER_DATA_CHANGE: "user_data_change"
    },
    on: function (type, callback) {
        if (typeof callback !== "function") throw new Error("Callback must be a fuction");

        this.listeners.push({
            type,
            callback
        });
    },
    off: function (type, callback) {
        this.listeners = this.listeners
            .filter(item => !(item.type === type) && !(item.callback === callback));
    },
    dispatchEvent: function (type) {
        this.listeners.forEach(item => item.type === type && item.callback());
    },

    isAuth: async function () {
        const token = localStorage.getItem("token");

        if (!token)
            return this.isAuth = false;


        this.token.set(token);

        if (!isValidAuthorization(this.token.get()))
            return this.isAuth = false;

        const userData = await this.token.getUserData();

        this.isAuth = !!userData;

        if (!this.isAuth) return this.token.clear();

        return this.userData = userData;
    },
    init: async function () {
        this.isAuth();
    },
    logout: function () {
        if (!this.isAuth) return;

        this.token.clear();
        this.isAuth = false;
        this.userData = null;
    },
    token: {
        clear: () => localStorage.removeItem(storage_prefix),
        get: () => `Bearer ${localStorage.getItem(storage_prefix)}`,
        set: token => localStorage.setItem(storage_prefix, token),
        getUserData: async function () {
            try {
                const response = await backend.get("/users", {
                    headers: {
                        authorization: this.get()
                    }
                });
                return response;
            } catch (error) {
                if (this.error.code === "user/unauthorized")
                    return false;
            }
        }
    }
}

export default Auth;