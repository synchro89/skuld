import backend_core from "../core/backend";

const Users = {
    get: async function (token) {
        try {
            const response = await backend_core.get("/users", {
                headers: {
                    authorizathion: token
                }
            });
            return response;
        } catch (error) {
            throw error;
        }
    },
    auth: async function (data) {

    },
    create: async function (data) {

    },
    update: async function (newData) {

    },
    delete: async function (token) {

    }
};

const Animes = {};

const Resources = {};

export {
    Users,
    Animes,
    Resources
};
