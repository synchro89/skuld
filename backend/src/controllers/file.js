const cloudinary = require('cloudinary').v2;

const FileController = {
    Index: function (req, res) {
        const { page } = req.query;

        const limit = 10;
        const skip = (page - 1) * limit;
    },
    Get: function (req, res) {
    },
    Store: function (req, res) {
        const formidable = require('formidable');
        const form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            console.log(err);
            console.log(fields);
            console.log(files);
            res.json({
                text: 'File uploaded'
            });
        });
    },
    Update: function (req, res) {
    },
    Delete: function (req, res) {
    },
}

module.exports = FileController;