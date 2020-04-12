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
    _getEndpoint: function (endpoint) {
        return this.baseURL + endpoint
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
    get: function (endpoint, userConfig) {
        return this._sendRequestWith(endpoint, getDefaultConfig, userConfig);
    }
}

export default api;