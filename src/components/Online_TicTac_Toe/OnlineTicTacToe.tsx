import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Replace with your server URL

const OnlineTicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameResult, setGameResult] = useState(null);

  useEffect(() => {
    // Handle real-time updates from the server
    socket.on("gameUpdate", (updatedBoard) => {
      setBoard(updatedBoard);
    });

    socket.on("gameResult", (result) => {
      setGameResult(result);
    });

    // Clean up socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleClick = (index: any) => {
    if (board[index] === "" && !gameResult) {
      // Emit a message to the server with the move
      socket.emit("move", { index, player: currentPlayer });
    }
  };

  const renderSquare = (index: any) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const getStatusMessage = () => {
    if (gameResult) {
      if (gameResult === "draw") {
        return "It's a draw!";
      } else {
        return `Player ${gameResult} wins!`;
      }
    } else {
      return `Next player: ${currentPlayer}`;
    }
  };

  return (
    <div className="game">
      <div className="status">{getStatusMessage()}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default OnlineTicTacToe;
