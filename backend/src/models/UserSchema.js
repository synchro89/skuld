const { Schema } = require("mongoose");

const FileSchema = require("./FileSchema");

const UserSchema = new Schema(
    {
        name: {
            type: String,
            unique: true
        },
        photo: {
            type: FileSchema,
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongo.model("User", UserSchema);