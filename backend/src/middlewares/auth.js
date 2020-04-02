const authConfig = require("../config");
const jwt = require("jsonwebtoken");

const defaultOptions = {
    nextIfNotAuth: false
}

const middleware = (userOptions) => {
    const options = Object.assign({}, defaultOptions, userOptions);

    const { nextIfNotAuth } = options;

    return function (req, res, next) {
        let isAuth = true;

        const { Authorization: authorization } = req.headers;

        if (!authorization)
            isAuth = false;

        const parts = authorization.split(" ");

        if (parts.length !== 2)
            isAuth = false;

        const [scheme, token] = parts;

        if (!/^Bearer$/.test(scheme))
            isAuth = false;


        jwt.verify(token, authConfig.secret, (error, decoded) => {
            if (error) isAuth = false;

            req.authState = {
                isAuth,
                userId: decoded.id
            }

            if (nextIfNotAuth) return next(authState);
        });
    }
}



module.exports = middleware;