String.prototype.divide = function (separator) {
    return this.split(separator).filter(letter => letter !== "");
}
String.prototype.toHtml = function () {
    const str = this;
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, 'text/html');
    return doc.body.firstChild;
}