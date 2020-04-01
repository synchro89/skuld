function generateResponse(metadata, complement = {}) {
    const response = Object.assign({}, metadata, complement);

    return response;
}

function calcSkip(page, limit = 10) {
    const skip = (page - 1) * limit;
    return {
        limit,
        skip
    }
}

module.exports = {
    generateResponse,
    calcSkip
}