const mongo = require("../database");

const { Schema } = mongo;

const FileSchema = require("./FileSchema");

const UserSchema = new Schema(
    {
        name: {
            type: String,
            unique: true
        },
        password: {
            type: String,
            select: false
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