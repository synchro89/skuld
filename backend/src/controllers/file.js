const cloudinary = require('cloudinary').v2;

const UserController = {
    Index: function (req, res) {
        const { page } = req.query;

        const limit = 10;
        const skip = (page - 1) * limit;
    },
    Store: function (req, res) {
    }
}

module.exports = UserController;