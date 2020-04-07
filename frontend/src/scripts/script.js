String.prototype.divide = function (separator) {
  return this.split(separator).filter(letter => letter !== "");
}