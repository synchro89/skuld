
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

function interpolate(xInterval, yInterval) {
    let [x0, x1] = xInterval;
    let [y0, y1] = yInterval;

    return function (xA) {
        if (xA > x1) xA = x1;
        else if (xA < x0) xA = x0;

        const yA = y0 + (y1 - y0) * ((xA - x0) / (x1 - x0));

        return yA;
    };
}

function calcSkip(page, limit = 10) {
    return (page - 1) * limit;
}

function isTouchDevice() {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
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
    getByClass,
    interpolate,
    calcSkip,
    isTouchDevice
}