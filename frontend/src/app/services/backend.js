const getDefaultConfig = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
};

const backend = {
    baseURL: process.env.BACKEND_URL,
    get: async function (endpoint, userConfig) {
        console.log("a");
        const response = await fetch(this.baseURL + endpoint, Object.assign({}, getDefaultConfig, userConfig));
        const data = await response.json();
        return data;
    }
}

export default backend;