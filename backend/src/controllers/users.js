const User = require("../models/UserSchema");

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

            const outputBuffer = await sharp(photo.path)
                .resize(200, 200, {
                    fit: sharp.fit.inside,
                    withoutEnlargement: true
                })
                .toFormat('webp')
                .toFile(path.join(__dirname, newName));

            response.outputBuffer = outputBuffer;
        }
        res.json(response);
    },
    Update: function (req, res) {
    },
    Delete: function (req, res) {
    },
}

module.exports = UserController;