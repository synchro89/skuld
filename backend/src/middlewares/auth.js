const defaultOptions = {
    nextIfNotAuth: false
}

const middleware = (userOptions) => {
    const options = Object.assign({}, defaultOptions, userOptions);

    const { nextIfNotAuth } = options;

    return function (req, res, next) {
        const { Authorization } = req.headers;
        console.log("opa");
    }
}

module.exports = middleware;