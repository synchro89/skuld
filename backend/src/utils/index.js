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

function isValidName(name) {
    let valid = true;

    const allLetters = name.split("");

    for (let i = 0; i < allLetters.length; i++) {
        const letter = allLetters[i];
        const code = letter.charCodeAt();

        if (code < 65) valid = false;
        else if (code > 90 && code < 97) valid = false;
        else if (code > 122) valid = false;

        if (!valid) break;
    }

    return valid;
}

module.exports = {
    generateResponse,
    calcSkip,
    isValidName
}