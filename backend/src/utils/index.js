function generateResponse(metadata, complement = {}) {
    const response = Object.assign({}, metadata, complement);

    return response;
}

module.exports = {
    generateResponse
}