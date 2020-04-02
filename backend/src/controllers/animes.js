const { calcSkip } = require("../utils");

const { user: userResponses } = require("../responses");
const { anime: animeResponses } = require("../responses");
const { generateResponse: generate, compareId, exists } = require("../utils");

const mongoose = require('../database');

const UserSchema = require("../models/UserSchema");
const AnimeSchema = require("../models/AnimeSchema");

const AnimeController = {
    Create: async function (req, res) {
        let { userId, animeId } = req.body;
        let { userId: loggedUserId } = req.authState;

        if (!compareId(loggedUserId, userId)) {
            const { unauthorized } = userResponses;
            return res
                .status(unauthorized.status)
                .json(generate(unauthorized, { error: true }));
        }

        userId = mongoose.Types.ObjectId(userId);
        userIdLikeString = userId.toString();

        const user = await UserSchema.findOne({ _id: userId });

        if (!user) {
            const { userNotExists } = userResponses;
            return res
                .status(userNotExists.status)
                .json(generate(userNotExists, { error: true }));
        }

        let anime = await AnimeSchema.findOne({
            fk_user_id: userIdLikeString,
            fk_anime_id: animeId
        });

        if (exists(anime)) {
            const { alreadyExists } = animeResponses;
            return res
                .status(alreadyExists.status)
                .json(generate(alreadyExists, { error: true }));
        }

        anime = await AnimeSchema.create({
            fk_user_id: userIdLikeString,
            fk_anime_id: animeId
        });

        const { successCreated } = animeResponses;
        return res.json(generate(successCreated, { data: anime }));
    },
}

module.exports = AnimeController;