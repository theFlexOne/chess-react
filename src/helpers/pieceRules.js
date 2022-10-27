import { DIRECTION_KEY } from "./constants";
import { numberToLetter } from "./functions";

const calculateMovesFromDirection = (
  [first, second = undefined],
  square,
  pieces,
  limit = null
) => {
  const x = square.colX;
  const y = square.rowY;
  const dir1 = DIRECTION_KEY[first.toLowerCase()];
  const dir2 = second ? DIRECTION_KEY[second.toLowerCase()] : [];
  if (dir1[0] === dir2?.[0])
    return console.error(`Invalid directions: "${first}" "${second}"`);
  const direction = {
    x: 0,
    y: 0,
    ...Object.fromEntries([dir1]),
    ...Object.fromEntries([dir2]),
  };
  const availableSquares = [];
  let piece = null;
  for (let i = 1; i < 8; i++) {
    if (availableSquares.length === limit) break;
    const newX = x + i * direction.x;
    const newY = y + i * direction.y;
    if (newX < 1 || newX > 8 || newY < 1 || newY > 8) continue;
    const newSquareId = `${numberToLetter(newX)}${newY}`;
    const occupyingPiece = pieces.find((p) => p.square.id === newSquareId);
    if (occupyingPiece) {
      piece = occupyingPiece;
      break;
    }
    availableSquares.push(newSquareId);
  }
  return [availableSquares, piece];
};

const calculateAvailableKingMoves = (square, pieces) => {
  const curPiece = pieces.find((p) => p.square.id === square.id);
  const left = calculateMovesFromDirection(["left"], square, pieces, 1);
  const right = calculateMovesFromDirection(["right"], square, pieces, 1);
  const down = calculateMovesFromDirection(["down"], square, pieces, 1);
  const up = calculateMovesFromDirection(["up"], square, pieces, 1);
  const upLeft = calculateMovesFromDirection(["left", "up"], square, pieces, 1);
  const upRight = calculateMovesFromDirection(
    ["right", "up"],
    square,
    pieces,
    1
  );
  const downLeft = calculateMovesFromDirection(
    ["left", "down"],
    square,
    pieces,
    1
  );
  const downRight = calculateMovesFromDirection(
    ["right", "down"],
    square,
    pieces,
    1
  );
  const dirs = [up, down, left, right, upLeft, upRight, downLeft, downRight];
  return dirs.reduce(
    (acc, cur) => {
      acc.availableMoves.push(...cur[0]);
      if (cur[1] && cur[1].color !== curPiece.color)
        acc.attackingMoves.push(cur[1].square);
      return acc;
    },
    { availableMoves: [], attackingMoves: [] }
  );
};

const calculateAvailableKingMovesOld = (square, pieces) => {
  const colIds = [
    square.colX - 1 ? numberToLetter(square.colX - 1) : null,
    numberToLetter(square.colX),
    square.colX + 1 <= 8 ? numberToLetter(square.colX + 1) : null,
  ].filter((id) => id);
  const rowIds = [
    square.colY - 1 ? `${square.colY - 1}` : null,
    `${square.colY}`,
    square.colY + 1 <= 8 ? `${square.colY + 1}` : null,
  ].filter((id) => id);
  const possibleSquares = colIds.map((c) => rowIds.map((r) => c + r)).flat();
  const takenSquares = pieces.reduce((acc, cur) => {
    cur.square[0] && acc.push(cur.square);
    return acc;
  }, []);
  return possibleSquares.filter((id) => takenSquares.indexOf(id) === -1);
};

const calculateAvailableQueenMoves = (square, pieces) => {
  const curPiece = pieces.find((p) => p.square.id === square.id);
  const left = calculateMovesFromDirection(["left"], square, pieces);
  const right = calculateMovesFromDirection(["right"], square, pieces);
  const down = calculateMovesFromDirection(["down"], square, pieces);
  const up = calculateMovesFromDirection(["up"], square, pieces);
  const upLeft = calculateMovesFromDirection(["left", "up"], square, pieces);
  const upRight = calculateMovesFromDirection(["right", "up"], square, pieces);
  const downLeft = calculateMovesFromDirection(
    ["left", "down"],
    square,
    pieces
  );
  const downRight = calculateMovesFromDirection(
    ["right", "down"],
    square,
    pieces
  );
  const dirs = [up, down, left, right, upLeft, upRight, downLeft, downRight];
  return dirs.reduce(
    (acc, cur) => {
      acc.availableMoves.push(...cur[0]);
      if (cur[1] && cur[1].color !== curPiece.color)
        acc.attackingMoves.push(cur[1].square);
      return acc;
    },
    { availableMoves: [], attackingMoves: [] }
  );
};

const calculateAvailableRookMoves = (square, pieces) => {
  const curPiece = pieces.find((p) => p.square.id === square.id);
  const up = calculateMovesFromDirection(["up"], square, pieces);
  const down = calculateMovesFromDirection(["down"], square, pieces);
  const left = calculateMovesFromDirection(["left"], square, pieces);
  const right = calculateMovesFromDirection(["right"], square, pieces);
  const dirs = [up, down, left, right];
  return dirs.reduce(
    (acc, cur) => {
      acc.availableMoves.push(...cur[0]);
      if (cur[1] && cur[1].color !== curPiece.color)
        acc.attackingMoves.push(cur[1].square);
      return acc;
    },
    { availableMoves: [], attackingMoves: [] }
  );
};

const calculateAvailableBishopMoves = (square, pieces) => {
  const curPiece = pieces.find((p) => p.square.id === square.id);
  const upLeft = calculateMovesFromDirection(["up", "left"], square, pieces);
  const upRight = calculateMovesFromDirection(["up", "right"], square, pieces);
  const downLeft = calculateMovesFromDirection(
    ["down", "left"],
    square,
    pieces
  );
  const downRight = calculateMovesFromDirection(
    ["down", "right"],
    square,
    pieces
  );
  const dirs = [upLeft, upRight, downLeft, downRight];
  return dirs.reduce(
    (acc, cur) => {
      acc.availableMoves.push(...cur[0]);
      if (cur[1] && cur[1].color !== curPiece.color)
        acc.attackingMoves.push(cur[1].square);
      return acc;
    },
    { availableMoves: [], attackingMoves: [] }
  );
};

const calculateAvailableKnightMoves = (square, pieces) => {
  const curPiece = pieces.find((p) => p.square.id === square.id);
  const { colX, rowY } = square;
  const coords = [
    [colX + 2, rowY + 1],
    [colX + 2, rowY - 1],
    [colX - 2, rowY + 1],
    [colX - 2, rowY - 1],
    [colX + 1, rowY + 2],
    [colX - 1, rowY + 2],
    [colX + 1, rowY - 2],
    [colX - 1, rowY - 2],
  ];

  return coords.reduce(
    (acc, cur) => {
      if (cur.some((n) => n < 1 || n > 8)) return acc;
      const squareId = `${numberToLetter(cur[0])}${cur[1]}`;
      const occupyingPiece = pieces.find((p) => p.square.id === squareId);
      if (occupyingPiece) {
        if (occupyingPiece.color === curPiece.color) return acc;
        acc.attackingMoves.push(squareId);
        return acc;
      }
      acc.availableMoves.push(squareId);
      return acc;
    },
    {
      availableMoves: [],
      attackingMoves: [],
    }
  );
};

const calculateAvailablePawnMoves = (square, pieces) => {
  const curPiece = pieces.find((p) => p.square.id === square.id);
  const limit = +square.rowY === 2 || square.rowY === 7 ? 2 : 1;
  const dir = curPiece.color === "white" ? "up" : "down";
  const availableMoves = calculateMovesFromDirection(
    [dir],
    square,
    pieces,
    limit
  )[0];
  const attackingMoves = (() => {
    const square1 = `${numberToLetter(square.colX - 1)}${
      +square.rowY + (dir[0] === "white" ? -1 : 1)
    }`;
    const square2 = `${numberToLetter(square.colX + 1)}${
      +square.rowY + (dir[0] === "white" ? -1 : 1)
    }`;
    return [square1, square2].filter((sq) => {
      const occupyingPiece = pieces.find((p) => p.square.id === sq);
      if (!occupyingPiece || occupyingPiece.color === curPiece.color)
        return false;
      return true;
    });
  })();
  return { availableMoves, attackingMoves };
};

const piecesRules = {
  k: calculateAvailableKingMoves,
  q: calculateAvailableQueenMoves,
  r: calculateAvailableRookMoves,
  n: calculateAvailableKnightMoves,
  b: calculateAvailableBishopMoves,
  p: calculateAvailablePawnMoves,
};

export default piecesRules;
