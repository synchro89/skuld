const { calcSkip } = require("../utils");

const { anime: animeResponses } = require("../responses");
const { user: userResponses } = require("../responses");
const { generateResponse: generate } = require("../utils");

const mongoose = require('../database');

const UserSchema = require("../models/UserSchema");
const AnimeSchema = require("../models/AnimeSchema");

const AnimeController = {
    Create: async function (req, res) {
        let { userId, animeId } = req.body;
        let { userId: loggedUserId } = req.authState;

        userId = mongoose.Types.ObjectId(userId);

        const user = await UserSchema.findOne({ _id: userId });

        if (!user) {
            const { userNotExists } = userResponses;
            return res
                .status(userNotExists.status)
                .json(generate(userNotExists, { error: true }));
        }
    }
}

module.exports = AnimeController;