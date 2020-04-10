
function isValidName(name) {
    let valid = true;

    const allLetters = name.split("");

    for (let i = 0; i < allLetters.length; i++) {
        const letter = allLetters[i];
        const code = letter.charCodeAt();

        if (code < 48) valid = false;
        else if (code > 57 && code < 65) valid = false;
        else if (code > 90 && code < 97) valid = false;
        else if (code > 122) valid = false;

        if (!valid) break;
    }

    return valid;
}
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const getById = document.getElementById.bind(document);
const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);
const getByClass = document.getElementsByClassName.bind(document);

export {
    isValidName,
    randomNumber,
    getById,
    query,
    queryAll,
    getByClass
}