const mongo = require("mongoose");

const { Schema } = mongo;

const FileSchema = require("./FileSchema");

const UserSchema = new Schema(
    {
        name: {
            type: String,
            unique: true
        },
        photo: {
            type: FileSchema,
        },
        animes: [{
            type: String
        }]
    },
    {
        timestamps: true
    }
);

module.exports = mongo.model("User", UserSchema);