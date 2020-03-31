const { Schema } = require("mongoose");

const FileSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongo.model("File", FileSchema);