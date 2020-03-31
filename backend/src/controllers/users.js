const User = require("../models/UserSchema");

const cloudinary = require("../cloudinary");

const fs = require('fs')

const path = require("path");

const sharp = require("sharp");

const UserController = {
    Index: function (req, res) {
        const { page } = req.query;

        const limit = 10;
        const skip = (page - 1) * limit;
    },
    Get: function (req, res) {
    },
    Store: async function (req, res) {
        const { fields, files } = req;
        const { photo } = files;

        let response = {
            fields,
            files
        }

        if (photo) {
            let newName = photo.name.split(".").map(
                (part, i, fullName) => i === fullName.length - 1 ? "webp" : part
            ).join(".");

            let newPhotoPath = path.normalize(path.join(__dirname, "..", "temp", newName));

            const newImage = await sharp(photo.path)
                .resize(250, 250, {
                    fit: sharp.fit.inside,
                    withoutEnlargement: true
                })
                .toFormat('webp')
                .toFile(newPhotoPath);

            response.newImage = newImage;

            await cloudinary.uploader.upload(newPhotoPath, function (error, result) {
                if (error) throw new Error(error);

                fs.unlink(newPhotoPath, (error) => {
                    if (error)
                        throw new Error(error);
                });

                response.cloudinaryResponse = {
                    result,
                    error
                }
            });

        }
        res.json(response);
    },
    Update: function (req, res) {
    },
    Delete: function (req, res) {
    },
}

module.exports = UserController;