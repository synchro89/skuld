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
    update: function () {

    }
};

const Animes = {};

const Resources = {};

export {
    Users,
    Animes,
    Resources
};
