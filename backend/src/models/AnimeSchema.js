const mongo = require("../database");

const { Schema } = mongo;

const AnimeSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            select: false,
            required: true
        },
        recovery_codes: {
            type: Array,
            required: true
        }
    },
    {
        timestamps: true
    }
);

require("./preActions/anime")(AnimeSchema);

module.exports = mongo.model("Anime", AnimeSchema);