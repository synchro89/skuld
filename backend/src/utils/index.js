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

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateRecoveryCodes() {
    return Array.from({ length: 4 }).map(() => ({
        valid: true,
        code: Array.from({ length: 6 }).map(() => generateRandomNumber(0, 9).toString()).join("")
    }));
}

module.exports = {
    generateResponse,
    calcSkip,
    isValidName,
    generateRandomNumber,
    generateRecoveryCodes
}