import { useState } from "react";
import "./App.css";

import Board from "./components/Board/Board";
import { ChessPiecesProvider } from "./context/ChessPiecesContext";

function App() {
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);
  const endTurn = () => setIsWhiteTurn((turn) => !turn);
  return (
    <ChessPiecesProvider>
      <Board isWhiteTurn={isWhiteTurn} endTurn={endTurn} />
    </ChessPiecesProvider>
  );
}

export default App;
