export const INITIAL_SETUP = {
  white: {
    king: [{ square: "e1" }],
    queen: [{ square: "d1" }],
    rook: [{ square: "a1" }, { square: "h1" }],
    knight: [{ square: "b1" }, { square: "g1" }],
    bishop: [{ square: "c1" }, { square: "f1" }],
    pawn: [
      { square: "a2" },
      { square: "b2" },
      { square: "c2" },
      { square: "d2" },
      { square: "e2" },
      { square: "f2" },
      { square: "g2" },
      { square: "h2" },
    ],
  },
  black: {
    king: [{ square: "e8" }],
    queen: [{ square: "d8" }],
    rook: [{ square: "a8" }, { square: "h8" }],
    knight: [{ square: "b8" }, { square: "g8" }],
    bishop: [{ square: "c8" }, { square: "f8" }],
    pawn: [
      { square: "a7" },
      { square: "b7" },
      { square: "c7" },
      { square: "d7" },
      { square: "e7" },
      { square: "f7" },
      { square: "g7" },
      { square: "h7" },
    ],
  },
};
export const PIECES_DATA = {
  king: {
    name: "king",
    id: "k",
  },
  queen: {
    name: "queen",
    id: "q",
  },
  rook: {
    name: "rook",
    id: "r",
  },
  knight: {
    name: "knight",
    id: "n",
  },
  bishop: {
    name: "bishop",
    id: "b",
  },
  pawn: {
    name: "pawn",
    id: "p",
  },
};

export const DIRECTION_KEY = {
  up: ["y", 1],
  down: ["y", -1],
  left: ["x", -1],
  right: ["x", 1],
};
