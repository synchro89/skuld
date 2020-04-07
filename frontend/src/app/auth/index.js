import { Users } from "../services/sdk/backend";

const storage_prefix = "skuld__app__access__token";

function isValidAuthorization(authorization) {
    if (!authorization)
        return false;

    const parts = authorization.split(" ");

    if (parts.length !== 2)
        return false;

    const [scheme] = parts;

    if (!/^Bearer$/.test(scheme))
        return false;

    return true;
}

const Auth = {
    userData: null,

    listeners: [],

    events: {
        AUTH_INIT: "auth_init",
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
        this.listeners.forEach(item => item.type === type && item.callback(this));
    },
    isAuth: function () {
        return !!this.userData;
    },
    auth: async function () {
        const token = localStorage.getItem(storage_prefix);

        if (!token)
            return;

        this.token.set(token);

        if (!isValidAuthorization(this.token.get()))
            return;

        const userData = await this.token.getUserData();

        if (!userData) return this.token.clear();

        this.userData = userData;
        this.dispatchEvent(this.events.AUTH_STATE_CHANGE);
    },
    init: async function () {
        await this.auth();
        return this.dispatchEvent(this.events.AUTH_INIT);
    },
    login: function (token, userData) {
        this.userData = userData;
        localStorage.setItem(storage_prefix, token);
    },
    logout: function () {
        if (!this.isAuth()) return;

        this.token.clear();
        this.userData = null;

        this.dispatchEvent(this.events.AUTH_STATE_CHANGE);
    },
    token: {
        clear: () => localStorage.removeItem(storage_prefix),
        get: () => `Bearer ${localStorage.getItem(storage_prefix)}`,
        set: token => localStorage.setItem(storage_prefix, token),
        getUserData: async function () {
            try {
                const response = await Users.get(this.get());
                return response;
            } catch (error) {
                return false;
            }
        }
    }
}

export default Auth;