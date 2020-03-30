const { Schema } = require("mongoose");

const UserSchema = new Schema(
    {
        name: String,
    },
    {
        timestamps: true
    }
);

module.exports = mongo.model("User", UserSchema);