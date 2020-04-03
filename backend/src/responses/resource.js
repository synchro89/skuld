const resourceResponses = {
    invalidResource: {
        message: "Invalid resource, the resource requested not exists",
        code: "resource/invalid-resource",
        model: "ResourceSchema",
        status: 400
    }
}

module.exports = resourceResponses;