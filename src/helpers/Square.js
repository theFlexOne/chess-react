const convertLetterToNumber = (l) => l.toLowerCase().charCodeAt() - 96;
const convertNumberToLetter = (n) => String.fromCharCode(n + 96);

export default class Square {
  constructor(id) {
    this.id = id;
  }
  get col() {
    return this.id[0];
  }
  get colX() {
    return convertLetterToNumber(this.id[0]);
  }
  get row() {
    return this.id.slice(-1);
  }
  get rowY() {
    return +this.id.slice(-1);
  }
  toString() {
    return this.id;
  }
}
