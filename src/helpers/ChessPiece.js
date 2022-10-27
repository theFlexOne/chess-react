import { DIRECTION_KEY } from "./constants";
import piecesRules from "./pieceRules";

export default class ChessPiece {
  static all = [];
  constructor({ id, name, square, color }) {
    this.id = id;
    this.color = color;
    this.square = square;
    this.name = name;

    ChessPiece.all.push(this);
  }
  moves(pieces) {
    return piecesRules[this.typeCode](this.square, pieces);
  }

  get pieceCode() {
    return this.id.slice(0, -1);
  }

  get colorCode() {
    return this.color[0].toLowerCase();
  }
  get typeCode() {
    return this.id[0].toLowerCase();
  }

  get iconCode() {
    return this.typeCode + this.colorCode;
  }

  get isAlive() {
    if (!this.square[0]) return false;
    return true;
  }
}
