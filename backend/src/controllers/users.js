const fs = require('fs')
const path = require("path");

const cloudinary = require("../cloudinary");
const sharp = require("sharp");

const { user: userResponses } = require("../responses");
const { generate } = userResponses;

const UserSchema = require("../models/UserSchema");

const UserController = {
    Index: function (req, res) {
        const { page } = req.query;

        const limit = 10;
        const skip = (page - 1) * limit;
    },
    Get: function (req, res) {
    },
    Store: async function (req, res) {
        try {
            const {
                fields: { name },
                files: { photo = null }
            } = req;

            let userData = {
                name,
                photo
            }

            if (!!await UserSchema.findOne({ name })) {
                const { alreadyExists } = userResponses;

                return res
                    .status(alreadyExists.status)
                    .json(generate(alreadyExists, { error: true }));
            }

            if (!photo) {
                const user = await UserSchema.create(userData);

                const { successCreated } = userResponses;
                return res.json(generate(successCreated, { data: user }));
            } else {
                userData.photo = await uploadFile(photo);

                const user = await UserSchema.create(userData);

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
    Update: async function (req, res) {
        try {
            const {
                fields: { name },
                files: { photo = null }
            } = req;

            const user = await UserSchema.findOne({ name });

            if (!user) {
                const { userNotExists } = userResponses;
                return res.status(userNotExists.status).json(generate(userNotExists, { error: true }));
            }
            if (!photo) {
                return res.status(203);
            }

            const newPhoto = await uploadFile(photo, user.photo.public_id);

            const newUser = await UserSchema.findByIdAndUpdate(user._id, {
                name: user.name,
                photo: newPhoto
            }, {
                new: true
            });

            return res.json({
                newUser
            });

        } catch (error) {
            const { unknownError } = userResponses;
            return res
                .status(unknownError.status)
                .json(generate(unknownError, { error }));
        }
    },
    Delete: function (req, res) {
    },
}

async function uploadFile(photo, currentPublicID = false) {
    let newName = photo.name.split(".").map(
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

    await cloudinary.uploader.upload(...args)

    return fileUploaded;
}

module.exports = UserController;