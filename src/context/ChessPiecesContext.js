import { useContext, createContext, useReducer } from "react";
import ChessPiece from "../helpers/ChessPiece";
import { PIECES_DATA, INITIAL_SETUP } from "../helpers/constants";
import Square from "../helpers/Square";

const ChessPiecesContext = createContext();
for (const color in INITIAL_SETUP) {
  const pieces = INITIAL_SETUP[color];
  // console.log("color", color);
  for (const piece in pieces) {
    pieces[piece].forEach((p, i, arr) => {
      const typeCode = PIECES_DATA[piece].id;
      const colorCode = color[0];
      const square = new Square(p.square);
      const id = `${typeCode}${arr.length > 1 ? i + 1 : ""}${colorCode}`;
      new ChessPiece({ id, name: piece, color, square });
    });
  }
}

const reducer = (state, action) => {
  const { type, payload } = action;
  const newState = [...state];
  switch (type) {
    case "MOVE": {
      const pieceIndex = newState.findIndex((p) => p.id === payload.pieceId);
      newState[pieceIndex].square.id = payload.squareId;
      return newState;
    }
    case "ATTACK": {
      const attackingPieceIndex = newState.findIndex(
        (p) => p.id === payload.pieceId
      );
      const takenPieceIndex = newState.findIndex(
        (p) => p.id === payload.squareId
      );
      newState[attackingPieceIndex].square.id = payload.squareId;
      newState[takenPieceIndex].square.id = "";
      return newState;
    }
    default: {
      console.error("Invalid action type");
    }
  }
};

const ChessPiecesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, ChessPiece.all);
  // console.log("state", state);
  return (
    <ChessPiecesContext.Provider value={{ pieces: state, dispatch }}>
      {children}
    </ChessPiecesContext.Provider>
  );
};

const useChessPieces = () => {
  const ct = useContext(ChessPiecesContext);
  return ct || console.error("CONTEXT ERROR");
};

export { ChessPiecesProvider, useChessPieces };
