const fs = require('fs')
const path = require("path");

const { isValidName, generateRecoveryCodes } = require("../utils");

const { user: userResponses } = require("../responses");
const { generateResponse: generate, compareId, exists, stringToObjectId } = require("../utils");

const UserSchema = require("../models/UserSchema");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config");

const sharp = require("sharp");
const { uploader } = require("../cloudinary");

const UserController = {
    Get: async function(req, res) {
        try {
            let { userId } = req.authState;

            const user = await UserSchema.findOne({ _id: stringToObjectId(userId) });

            if (!exists(user)) {
                const { userNotExists } = userResponses;
                return res.status(userNotExists.status).json(generate(userNotExists, { error: true }));
            }

            const { successFetched } = userResponses;
            return res.json(generate(successFetched, { data: user }));
        } catch (error) {
            const { unknownError } = userResponses;
            return res
                .status(unknownError.status)
                .json(generate(unknownError, { error }));
        }
    },
    Update: async function(req, res) {
        let photo = null;
        try {
            const {
                file: img = null
            } = req;

            photo = img;

            const { userId } = req.authState;

            let user = await UserSchema.findOne({ _id: userId });

            if (!exists(user)) {
                if (exists(photo))
                    deleteLocalFile(photo.path);

                const { userNotExists } = userResponses;
                return res.status(userNotExists.status).json(generate(userNotExists, { error: true }));
            }

            if (!exists(photo)) {
                return res
                    .json(generate(successUpdated, { data: user }));
            }

            const newPhoto = await uploadFile(photo, user.photo.public_id);

            user = await UserSchema.findByIdAndUpdate(user._id, {
                name: user.name,
                photo: newPhoto
            }, {
                new: true
            });

            const { successUpdated } = userResponses;
            return res
                .json(generate(successUpdated, { data: user }));
        } catch (error) {
            if (exists(photo))
                deleteLocalFile(photo.path);

            const { unknownError } = userResponses;
            return res
                .status(unknownError.status)
                .json(generate(unknownError, { error }));
        }
    },
    Delete: async function(req, res) {
        try {
            const { userId } = req.authState;

            const user = await UserSchema.findOne({ _id: userId });

            if (!exists(user)) {
                const { userNotExists } = userResponses;
                return res.status(userNotExists.status).json(generate(userNotExists, { error: true }));
            }

            await UserSchema.findOneAndRemove({
                _id: user._id
            });

            const { successDeleted } = userResponses;
            return res.status(successDeleted.status).json(generate(successDeleted));
        } catch (error) {
            const { unknownError } = userResponses;
            return res
                .status(unknownError.status)
                .json(generate(unknownError, { error }));
        }
    },
    Store: async function(req, res) {
        let photo = null;
        try {
            const {
                body: { name = null, password = null },
                file: img = null
            } = req;

            photo = img;

            let userData = {
                name,
                password,
                photo,
                recovery_codes: generateRecoveryCodes()
            }

            if (!exists(name) || !exists(password)) {
                if (exists(photo))
                    deleteLocalFile(photo.path);

                const { fieldRequired } = userResponses;

                return res
                    .status(fieldRequired.status)
                    .json(generate(fieldRequired, { error: true }));
            }

            if (!isValidName(name)) {
                if (exists(photo))
                    deleteLocalFile(photo.path);

                const { invalidName } = userResponses;

                return res
                    .status(invalidName.status)
                    .json(generate(invalidName, { error: true }));
            }

            if (exists(await getUserByName(name))) {
                if (exists(photo))
                    deleteLocalFile(photo.path);

                const { alreadyExists } = userResponses;

                return res
                    .status(alreadyExists.status)
                    .json(generate(alreadyExists, { error: true }));
            }

            if (!exists(photo)) {
                const user = await UserSchema.create(userData);
                user.password = undefined;

                const { successCreated } = userResponses;
                return res.json(generate(successCreated, {
                    data: user,
                    accessToken: generateAccessToken(user._id)
                }));
            } else {
                userData.photo = await uploadFile(photo);

                const user = await UserSchema.create(userData);
                user.password = undefined;

                const { successCreated } = userResponses;
                return res.json(generate(successCreated, {
                    data: user,
                    accessToken: generateAccessToken(user._id)
                }));
            }
        } catch (error) {
            if (exists(photo))
                deleteLocalFile(photo.path);

            const { unknownError } = userResponses;
            return res
                .status(unknownError.status)
                .json(generate(unknownError, { error }));
        }
    },
    Auth: async function(req, res) {
        try {
            const { name = null, password = null } = req.body;

            if (!exists(name) || !exists(password)) {
                const { fieldRequired } = userResponses;

                return res
                    .status(fieldRequired.status)
                    .json(generate(fieldRequired, { error: true }));
            }

            const user = await getUserByName(name, { selectPassword: true });

            if (!exists(user)) {
                const { userNotExists } = userResponses;
                return res.status(userNotExists.status).json(generate(userNotExists, { error: true }));
            }

            if (!await bcrypt.compare(password, user.password)) {
                const { invalidPassword } = userResponses;
                return res.status(invalidPassword.status).json(generate(invalidPassword, { error: true }));
            }

            user.password = undefined;

            const { successAuth } = userResponses;
            return res.json(generate(successAuth, {
                data: user,
                accessToken: generateAccessToken(user._id)
            }));
        } catch (error) {
            const { unknownError } = userResponses;
            return res
                .status(unknownError.status)
                .json(generate(unknownError, { error }));
        }
    },
    GenerateCodes: async function(req, res) {
        try {
            const { name } = req.params;
            const { userId } = req.authState;

            let user = await getUserByName(name);

            if (!compareId(userId, user._id)) {
                const { unauthorized } = userResponses;
                return res
                    .status(unauthorized.status)
                    .json(generate(unauthorized, { error: true }));
            }

            const newRecoveryCodes = generateRecoveryCodes();

            user = await UserSchema.findByIdAndUpdate(user._id, {
                recovery_codes: newRecoveryCodes
            }, {
                new: true
            });

            const { successUpdated } = userResponses;
            return res
                .json(generate(successUpdated, { data: user }));
        } catch (error) {
            const { unknownError } = userResponses;
            return res
                .status(unknownError.status)
                .json(generate(unknownError, { error }));
        }
    },
    Reset: async function(req, res) {
        try {
            const { name } = req.params;
            const { password = false, newPassword, code = false } = req.body;
            const { userId, isAuth } = req.authState;

            if (isAuth) {
                let user = await getUserByName(name, { selectPassword: true })

                if (!exists(user)) {
                    const { userNotExists } = userResponses;
                    return res.status(userNotExists.status).json(generate(userNotExists, { error: true }));
                }

                if (!compareId(userId, user._id)) {
                    const { unauthorized } = userResponses;
                    return res
                        .status(unauthorized.status)
                        .json(generate(unauthorized, { error: true }));
                }

                if (exists(password)) {
                    if (!await bcrypt.compare(password, user.password)) {
                        const { invalidPassword } = userResponses;
                        return res
                            .status(invalidPassword.status)
                            .json(generate(invalidPassword, { error: true }));
                    }

                    const hash = await bcrypt.hash(newPassword, 10);

                    user = await UserSchema.findByIdAndUpdate(user._id, {
                        password: hash
                    }, {
                        new: true
                    });
                } else {
                    const validCodes = user.recovery_codes
                        .filter(item => item.valid)
                        .map(item => item.code);

                    if (!validCodes.includes(code)) {
                        const { invalidRecoveryCode } = userResponses;
                        return res
                            .status(invalidRecoveryCode.status)
                            .json(generate(invalidRecoveryCode, { error: true }));
                    }
                    const hash = await bcrypt.hash(newPassword, 10);
                    const updatedRecoveryCodes = user.recovery_codes
                        .map(item => item.code === code ? ({
                            code,
                            valid: false
                        }) : item);

                    user = await UserSchema.findByIdAndUpdate(user._id, {
                        password: hash,
                        recovery_codes: updatedRecoveryCodes
                    }, {
                        new: true
                    });
                }

                const { successUpdated } = userResponses;
                return res
                    .json(generate(successUpdated, { data: user }));

            } else {
                if (!exists(code)) {
                    const { invalidRecoveryCode } = userResponses;
                    return res
                        .status(invalidRecoveryCode.status)
                        .json(generate(invalidRecoveryCode, { error: true }));
                }
                let user = await getUserByName(name);

                if (!exists(user)) {
                    const { userNotExists } = userResponses;
                    return res.status(userNotExists.status).json(generate(userNotExists, { error: true }));
                }

                const validCodes = user.recovery_codes.filter(item => item.valid).map(item => item.code);
                if (!validCodes.includes(code)) {
                    const { invalidRecoveryCode } = userResponses;
                    return res
                        .status(invalidRecoveryCode.status)
                        .json(generate(invalidRecoveryCode, { error: true }));
                }
                const hash = await bcrypt.hash(newPassword, 10);
                const updatedRecoveryCodes = user.recovery_codes.map(item => item.code === code ? ({
                    code,
                    valid: false
                }) : item);

                user = await UserSchema.findByIdAndUpdate(user._id, {
                    password: hash,
                    recovery_codes: updatedRecoveryCodes
                }, {
                    new: true
                });
                const { successUpdated } = userResponses;

                return res
                    .json(generate(successUpdated, { data: user }));

            }
        } catch (error) {
            const { unknownError } = userResponses;
            return res
                .status(unknownError.status)
                .json(generate(unknownError, { error }));
        }
    }
}

async function uploadFile(photo, currentPublicID = false) {
    let newName = photo.originalname.split(".").map(
        (part, i, fullName) => i === fullName.length - 1 ? "webp" : part
    ).join(".");

    let newPhotoPath = path.normalize(path.join(__dirname, "..", "temp", newName));

    await sharp(photo.path)
        .resize(250, 250, {
            fit: sharp.fit.inside,
            withoutEnlargement: true
        })
        .toFormat('webp')
        .toFile(newPhotoPath);

    let fileUploaded = {};

    const callback = async(error, result) => {
        if (exists(error)) throw new Error(error);

        deleteLocalFile(newPhotoPath);
        deleteLocalFile(photo.path);

        const {
            public_id,
            format: ext,
            secure_url: url,
            original_filename: name
        } = result;

        fileUploaded = {
            public_id,
            ext,
            url,
            name
        }
    }

    const options = currentPublicID ? {
        public_id: currentPublicID
    } : {};


    // If have a current public_id, 
    // then the image/file already exists, then update, otherwise, create
    const args = currentPublicID ? [newPhotoPath, options, callback] : [newPhotoPath, callback]

    await uploader.upload(...args)

    return fileUploaded;
}

function deleteLocalFile(path) {
    fs.unlink(path, (error) => {
        if (exists(error))
            throw new Error(error);
    });
}


async function getUserByName(name, userOptions) {
    const defaultOptions = {
        selectPassword: false
    }

    const { selectPassword } = Object.assign({}, defaultOptions, userOptions);

    const user = await UserSchema.findOne({
        // Use this regex to make insenstive case query
        name: new RegExp("^" + name.toLowerCase() + "$", "i")
    }).select(selectPassword ? "+password" : "-password");

    return user;
}

function generateAccessToken(id) {
    const accessToken = jwt.sign({ id }, authConfig.secret, {
        expiresIn: 86400
    });
    return accessToken;
}



module.exports = UserController;