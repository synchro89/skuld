const mongo = require("mongoose");

const { Schema } = mongo;

const FileSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

module.exports = FileSchema;