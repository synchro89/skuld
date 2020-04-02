const authConfig = require("../config");
const jwt = require("jsonwebtoken");

const defaultOptions = {
    nextIfNotAuth: false
}

const middleware = (userOptions = {}) => {
    const options = Object.assign({}, defaultOptions, userOptions);

    const { nextIfNotAuth } = options;

    return function (req, res, next) {

        const { Authorization: authorization } = req.headers;

        if (!nextIfNotAuth) {
            const isAuth = isValidAuthorization(authorization);
        } else {
            const isAuth = isValidAuthorization(authorization)
            req.authState = {
                isAuth,
                userId: isAuth ? decoded.id : null
            }
            next();
        }


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

module.exports = middleware;