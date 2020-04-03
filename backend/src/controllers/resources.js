const { calcSkip, isValidName, generateRecoveryCodes } = require("../utils");

const { user: userResponses } = require("../responses");
const { generateResponse: generate, compareId, exists } = require("../utils");

const UserSchema = require("../models/UserSchema");
const AnimeSchema = require("../models/AnimeSchema");

const ResourceController = {
    Index: async function (req, res) {
        try {
            let { page, limit = 2 } = req.query;

            const total = await UserSchema.find().estimatedDocumentCount();

            page = Number(page);
            limit = Number(limit);
            totalPages = Math.ceil(total / limit);

            let skip = null;


            skip = calcSkip(page, limit).skip;
            const currentResults = await UserSchema.find()
                .skip(skip)
                .limit(limit)
                .sort([
                    ["createdAt", "-1"]
                ]);

            if (!currentResults.length) {
                const { notFoundPagination: notFound } = userResponses;
                return res.status(notFound.status).json(generate(notFound, {
                    error: true
                }));
            }

            skip = calcSkip(page + 1, limit).skip;
            const nextResults = await UserSchema.find()
                .skip(skip)
                .limit(limit)
                .sort([
                    ["createdAt", "-1"]
                ]);

            const metadata = {
                hasMore: nextResults.length > 0,
                howManyDocsInNextPage: nextResults.length,
                totalDocs: total,
                currentPage: page,
                totalPages
            }

            const data = {
                results: currentResults,
                metadata,
            }

            const { successPagination } = userResponses;

            return res.json(generate(successPagination, {
                data
            }));
        } catch (error) {

            const { unknownError } = userResponses;
            return res
                .status(unknownError.status)
                .json(generate(unknownError, { error }));
        }
    }
}

module.exports = ResourceController;