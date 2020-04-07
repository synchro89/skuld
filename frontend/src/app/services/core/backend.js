const getDefaultConfig = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
};
const getDefaultConfig = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
};
const getDefaultConfig = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
};

const backend = {
    baseURL: process.env.BACKEND_URL,
    get: async function (endpoint, userConfig) {
        const response = await fetch(this.baseURL + endpoint, Object.assign({}, getDefaultConfig, userConfig));

        const data = await response.json();

        if (!response.ok)
            throw data;

        return data;
    }
}

export default backend;