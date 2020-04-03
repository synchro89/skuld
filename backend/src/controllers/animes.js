const { calcSkip } = require("../utils");

const { user: userResponses } = require("../responses");
const { anime: animeResponses } = require("../responses");
const { generateResponse: generate, compareId, exists } = require("../utils");

const mongoose = require('../database');

const UserSchema = require("../models/UserSchema");
const AnimeSchema = require("../models/AnimeSchema");

const AnimeController = {
    Create: async function (req, res) {
        try {
            let { userId, animeId } = req.body;
            let { userId: loggedUserId } = req.authState;

            if (!compareId(loggedUserId, userId)) {
                const { unauthorized } = userResponses;
                return res
                    .status(unauthorized.status)
                    .json(generate(unauthorized, { error: true }));
            }

            userId = stringToObjectId(userId);
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
        } catch (error) {
            const { unknownError } = animeResponses;
            return res
                .status(unknownError.status)
                .json(generate(unknownError, { error }));
        }
    },
    Delete: async function (req, res) {
        try {
            let { animeId } = req.params;
            const { userId } = req.authState;

            animeId = stringToObjectId(animeId);

            const anime = await AnimeSchema.findOne({ _id: animeId });

            if (!exists(anime)) {
                const { animeNotExists } = animeResponses;
                return res
                    .status(animeNotExists.status)
                    .json(generate(animeNotExists, { error: true }));
            }
            if (!compareId(userId, anime.fk_user_id)) {
                const { unauthorized } = animeResponses;
                return res
                    .status(unauthorized.status)
                    .json(generate(unauthorized, { error: true }));
            }

            await AnimeSchema.findOneAndRemove({ _id: stringToObjectId(animeId) });

            const { successDeleted } = animeResponses;
            return res.status(successDeleted.status).json(generate(successDeleted));
        } catch (error) {
            const { unknownError } = animeResponses;
            return res
                .status(unknownError.status)
                .json(generate(unknownError, { error }));
        }
    },
    Get: async function (req, res) {
        try {
            const { animeId } = req.params;
            const { userId } = req.authState;

            const anime = await AnimeSchema.findOne({ _id: stringToObjectId(animeId) });

            if (!exists(anime)) {
                const { animeNotExists } = animeResponses;
                return res
                    .status(animeNotExists.status)
                    .json(generate(animeNotExists, { error: true }));
            }

            if (!compareId(userId, anime.fk_user_id)) {
                const { unauthorized } = animeResponses;
                return res
                    .status(unauthorized.status)
                    .json(generate(unauthorized, { error: true }));
            }

            const { successFetched } = animeResponses;
            return res.json(generate(successFetched, { data: anime }));
        } catch (error) {
            const { unknownError } = animeResponses;
            return res
                .status(unknownError.status)
                .json(generate(unknownError, { error }));
        }
    }
}

function stringToObjectId(str) {
    return mongoose.Types.ObjectId(str);
}

module.exports = AnimeController;