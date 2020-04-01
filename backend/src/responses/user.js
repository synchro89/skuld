const { generateResponse: generate } = require("../utils");

const userResponses = {
    alreadyExists: {
        message: "User already exists on database",
        code: "user/already-exists",
        model: "UserSchema",
        status: 400
    },
    userNotExists: {
        message: "This user not exists",
        code: "user/not-exists",
        model: "UserSchema",
        status: 400
    },
    unknownError: {
        message: "Unknown error",
        code: "user/unknown-error",
        model: "UserSchema",
        status: 500
    },
    successCreated: {
        message: "User created with success",
        code: "user/created-with-success",
        model: "UserSchema",
        status: 201
    },
    successUpdated: {
        message: "User updated with success",
        code: "user/updated-with-success",
        model: "UserSchema",
        status: 200
    },
    generate
}

module.exports = userResponses;