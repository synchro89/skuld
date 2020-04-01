const fs = require('fs')
const path = require("path");

const cloudinary = require("../cloudinary");
const sharp = require("sharp");

const errors = require("../errors");

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
                files
            } = req;

            const { photo } = files;

            let userData = {
                name,
                photo: null
            }

            let user = null;

            if (!!await UserSchema.findOne({ name })) {
                return res.status(400).json({
                    message: "User Already Exists",
                    errors
                });
            }

            if (!photo) {
                user = await UserSchema.create(userData);
            } else {
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

                await cloudinary.uploader.upload(newPhotoPath, async (error, result) => {
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

                    userData.photo = {
                        name,
                        ext,
                        url,
                        public_id
                    }

                    user = await UserSchema.create(userData);
                });
            }
            return res.json(user);
        } catch (error) {
            throw new Error(error);
        }
    },
    Update: function (req, res) {
    },
    Delete: function (req, res) {
    },
}

module.exports = UserController;