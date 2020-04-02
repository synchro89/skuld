const { calcSkip } = require("../utils");

const { user: userResponses } = require("../responses");
const { anime: animeResponses } = require("../responses");
const { generateResponse: generate, compareId } = require("../utils");

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
        if (!compareId(loggedUserId, user._id)) {
            const { unauthorized } = userResponses;
            return res
                .status(unauthorized.status)
                .json(generate(unauthorized, { error: true }));
        }
    }
}

module.exports = AnimeController;