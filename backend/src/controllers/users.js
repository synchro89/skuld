const fs = require('fs')
const path = require("path");

const { calcSkip, isValidName, generateRecoveryCodes } = require("../utils");

const { user: userResponses } = require("../responses");
const { generate } = userResponses;

const UserSchema = require("../models/UserSchema");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sharp = require("sharp");
const { uploader } = require("../cloudinary");

const UserController = {
    Index: async function (req, res) {
        try {
            let { page, limit = 2 } = req.query;

            const total = await UserSchema.find().estimatedDocumentCount();

            page = Number(page);
            limit = Number(limit);
            totalPages = Math.ceil(total / limit);

            let skip = null;


            skip = calcSkip(page, limit).skip;
            const currentResults = await UserSchema.find()
                .skip(skip)
                .limit(limit)
                .sort([
                    ["createdAt", "-1"]
                ]);

            if (!currentResults.length) {
                const { notFoundPagination: notFound } = userResponses;
                return res.status(notFound.status).json(generate(notFound, {
                    error: true
                }));
            }

            skip = calcSkip(page + 1, limit).skip;
            const nextResults = await UserSchema.find()
                .skip(skip)
                .limit(limit)
                .sort([
                    ["createdAt", "-1"]
                ]);

            const metadata = {
                hasMore: nextResults.length > 0,
                howManyDocsInNextPage: nextResults.length,
                totalDocs: total,
                currentPage: page,
                totalPages
            }

            const data = {
                results: currentResults,
                metadata,
            }

            const { successPagination } = userResponses;

            return res.json(generate(successPagination, {
                data
            }));
        } catch (error) {

            const { unknownError } = userResponses;
            return res
                .status(unknownError.status)
                .json(generate(unknownError, { error }));
        }
    },
    Get: async function (req, res) {
        try {
            let { name } = req.params;

            name = name.replace(/-/g, " ");

            const user = await UserSchema.findOne({ name });

            if (!user) {
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
    Update: async function (req, res) {
        try {
            const {
                body: { name },
                file: { photo = null }
            } = req;

            const user = await UserSchema.findOne({ name });

            if (!user) {
                const { userNotExists } = userResponses;
                return res.status(userNotExists.status).json(generate(userNotExists, { error: true }));
            }

            if (!photo)
                return res.status(203);

            const newPhoto = await uploadFile(photo, user.photo.public_id);

            const newUser = await UserSchema.findByIdAndUpdate(user._id, {
                name: user.name,
                photo: newPhoto
            }, {
                new: true
            });

            const { successUpdated } = userResponses;
            return res
                .status(successUpdated.status)
                .json(generate(successUpdated, { data: newUser }));
        } catch (error) {
            const { unknownError } = userResponses;
            return res
                .status(unknownError.status)
                .json(generate(unknownError, { error }));
        }
    },
    Delete: async function (req, res) {
        try {
            const { name } = req.params;

            const user = await UserSchema.findOne({ name });

            if (!user) {
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
    Store: async function (req, res) {
        try {
            const {
                body: { name, password },
                file: photo = null
            } = req;

            let userData = {
                name,
                password,
                photo,
                recovery_codes: generateRecoveryCodes()
            }

            if (!isValidName(name)) {
                const { invalidName } = userResponses;

                return res
                    .status(invalidName.status)
                    .json(generate(invalidName, { error: true }));
            }

            if (!!await UserSchema.findOne({ name })) {
                const { alreadyExists } = userResponses;

                return res
                    .status(alreadyExists.status)
                    .json(generate(alreadyExists, { error: true }));
            }

            if (!photo) {
                const user = await UserSchema.create(userData);
                user.password = undefined;

                const { successCreated } = userResponses;
                return res.json(generate(successCreated, { data: user }));
            } else {
                userData.photo = await uploadFile(photo);

                const user = await UserSchema.create(userData);
                user.password = undefined;

                const { successCreated } = userResponses;
                return res.json(generate(successCreated, { data: user }));
            }
        } catch (error) {
            const { unknownError } = userResponses;
            return res
                .status(unknownError.status)
                .json(generate(unknownError, { error }));
        }
    },
    Auth: async function (req, res) {
        const { name, password } = req.body;

        const user = await UserSchema.findOne({ name }).select("+password");

        if (!user) {
            const { userNotExists } = userResponses;
            return res.status(userNotExists.status).json(generate(userNotExists, { error: true }));
        }

        if (!await bcrypt.compare(password, user.password)) {
            const { invalidPassword } = userResponses;
            return res.status(invalidPassword.status).json(generate(invalidPassword, { error: true }));
        }

        user.password = undefined;

        return res.json(user);
    },
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

    const callback = async (error, result) => {
        if (error) throw new Error(error);

        fs.unlink(newPhotoPath, (error) => {
            if (error)
                throw new Error(error);
        });
        fs.unlink(photo.path, (error) => {
            if (error)
                throw new Error(error);
        });

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
    const args = currentPublicID ?
        [newPhotoPath, options, callback] :
        [newPhotoPath, callback]

    await uploader.upload(...args)

    console.log(fileUploaded);

    return fileUploaded;
}



module.exports = UserController;