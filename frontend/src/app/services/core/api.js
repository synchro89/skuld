const defaultConfig = {
    mode: 'cors',
    cache: 'default',
    headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/json'
    },
}

const getDefaultConfig = {
    method: 'GET',
    ...defaultConfig
};

const api = {
    baseURL: process.env.API_URL,
    customBaseURL: null,
    _getEndpoint: function (endpoint) {
        const baseURL = this.customBaseURL || this.baseURL;
        console.log(baseURL);
        return baseURL + endpoint;
    },
    _mergeConfig: function (configs) {
        return Object.assign({}, ...configs);
    },
    _sendRequestWith: function (endpoint, ...requestConfig) {
        return this._request(this._getEndpoint(endpoint), this._mergeConfig([...requestConfig]));
    },
    _request: async function (endpoint, config) {
        const response = await fetch(endpoint, config);

        const data = await response.json();

        if (!response.ok)
            throw data;

        return data;
    },
    get: function (endpoint, userConfig = {}) {
        if (userConfig.hasOwnProperty("baseURL")) {
            this.customBaseURL = userConfig.baseURL;
            delete userConfig.baseURL;
        } else {
            this.customBaseURL = null;
        }

        return this._sendRequestWith(endpoint, getDefaultConfig, userConfig);
    }
}

export default api;