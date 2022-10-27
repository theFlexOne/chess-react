import { useChessPieces } from "../../context/ChessPiecesContext";
import "./board.css";
import * as piecesImages from "../../assets/images/chess_pieces";
import { useState } from "react";

const Square = ({ id, selected, ...other }) => {
  const { pieces } = useChessPieces();
  const piece = pieces.find((p) => p.square.id === id);
  return (
    <div className={`square${selected ? " selected" : ""}`} id={id} {...other}>
      {piece && (
        <img
          className={`chess-piece`}
          src={piecesImages[piece.iconCode]}
          alt={`${piece.color} ${piece.name}`}
        />
      )}
    </div>
  );
};

const Row = ({ id: rowId, onClick, selectedSquare, ...other }) => {
  const squareIds = (() => {
    const squareIds = [];
    for (let i = 1; i < 9; i++) {
      const squareId = String.fromCharCode(i + 96) + rowId;
      squareIds.push(squareId);
    }
    return squareIds;
  })();
  return (
    <div className="row" {...other}>
      {squareIds.map((id) => {
        return (
          <Square
            selected={id === selectedSquare}
            key={id}
            id={id}
            onClick={onClick}
          />
        );
      })}
    </div>
  );
};

const Board = (isWhiteTurn, endTurn) => {
  const { pieces, dispatch } = useChessPieces();
  const [selectedSquare, setSelectedSquare] = useState(null);

  const curPiece = pieces.find((p) => p.square.id === selectedSquare);
  const moves = curPiece?.moves(pieces);
  moves && console.log("moves", moves);

  const movePiece = (squareId) => {
    console.log("squareId", squareId);
    const piece = pieces.find((p) => p.square.id === selectedSquare);
    const moves = piece.moves(pieces);
    if (moves.availableMoves.includes(squareId)) {
      dispatch({
        type: "MOVE",
        payload: { pieceId: piece.id, squareId },
      });
      setSelectedSquare(null);
      return endTurn();
    }
    if (moves.attackingMoves.includes(squareId)) {
      dispatch({
        type: "ATTACK",
        payload: { pieceId: piece.id, squareId },
      });
      setSelectedSquare(null);
      return endTurn();
    }
  };

  const squareClick = (e) => {
    const squareId = e.currentTarget.id;
    if (selectedSquare) return movePiece(squareId);
    if (!e.currentTarget.children.length) return;
    if (squareId === selectedSquare) return setSelectedSquare(null);
    const curPiece = pieces.find((p) => p.square.id === squareId);
    if (
      (curPiece.color === "white" && !isWhiteTurn) ||
      (curPiece.color === "black" && isWhiteTurn)
    )
      return;
    setSelectedSquare(squareId);
  };

  console.log("selectedSquare", selectedSquare);

  return (
    <div className="board">
      <Row id="8" onClick={squareClick} selectedSquare={selectedSquare} />
      <Row id="7" onClick={squareClick} selectedSquare={selectedSquare} />
      <Row id="6" onClick={squareClick} selectedSquare={selectedSquare} />
      <Row id="5" onClick={squareClick} selectedSquare={selectedSquare} />
      <Row id="4" onClick={squareClick} selectedSquare={selectedSquare} />
      <Row id="3" onClick={squareClick} selectedSquare={selectedSquare} />
      <Row id="2" onClick={squareClick} selectedSquare={selectedSquare} />
      <Row id="1" onClick={squareClick} selectedSquare={selectedSquare} />
      {/* <div className="row" id="8">
        <Square id="a8"></Square>
        <Square id="b8"></Square>
        <Square id="c8"></Square>
        <Square id="d8"></Square>
        <Square id="e8"></Square>
        <Square id="f8"></Square>
        <Square id="g8"></Square>
        <Square id="h8"></Square>
      </div>
      <div className="row" id="7">
        <Square id="a7"></Square>
        <Square id="b7"></Square>
        <Square id="c7"></Square>
        <Square id="d7"></Square>
        <Square id="e7"></Square>
        <Square id="f7"></Square>
        <Square id="g7"></Square>
        <Square id="h7"></Square>
      </div>
      <div className="row" id="6">
        <Square id="a6"></Square>
        <Square id="b6"></Square>
        <Square id="c6"></Square>
        <Square id="d6"></Square>
        <Square id="e6"></Square>
        <Square id="f6"></Square>
        <Square id="g6"></Square>
        <Square id="h6"></Square>
      </div>
      <div className="row" id="5">
        <Square id="a5"></Square>
        <Square id="b5"></Square>
        <Square id="c5"></Square>
        <Square id="d5"></Square>
        <Square id="e5"></Square>
        <Square id="f5"></Square>
        <Square id="g5"></Square>
        <Square id="h5"></Square>
      </div>
      <div className="row" id="4">
        <Square id="a4"></Square>
        <Square id="b4"></Square>
        <Square id="c4"></Square>
        <Square id="d4"></Square>
        <Square id="e4"></Square>
        <Square id="f4"></Square>
        <Square id="g4"></Square>
        <Square id="h4"></Square>
      </div>
      <div className="row" id="3">
        <Square id="a3"></Square>
        <Square id="b3"></Square>
        <Square id="c3"></Square>
        <Square id="d3"></Square>
        <Square id="e3"></Square>
        <Square id="f3"></Square>
        <Square id="g3"></Square>
        <Square id="h3"></Square>
      </div>
      <div className="row" id="2">
        <Square id="a2"></Square>
        <Square id="b2"></Square>
        <Square id="c2"></Square>
        <Square id="d2"></Square>
        <Square id="e2"></Square>
        <Square id="f2"></Square>
        <Square id="g2"></Square>
        <Square id="h2"></Square>
      </div>
      <div className="row" id="1">
        <Square id="a1"></Square>
        <Square id="b1"></Square>
        <Square id="c1"></Square>
        <Square id="d1"></Square>
        <Square id="e1"></Square>
        <Square id="f1"></Square>
        <Square id="g1"></Square>
        <Square id="h1"></Square>
      </div> */}
    </div>
  );
};

export default Board;
