import React, { useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

function App() {
  const [game, setGame] = useState(new Chess());

  function onDrop(sourceSquare, targetSquare) {
    const gameCopy = new Chess(game.fen());
    try {
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', // always promote to a queen for simplicity
      });
      setGame(gameCopy);
      return move;
    } catch (error) {
      console.log(error)
      return null;
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <Chessboard position={game.fen()} onPieceDrop={onDrop} />
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <h3>{game.isGameOver() ? 'Game Over' : 'Game in progress'}</h3>
          {game.isCheckmate() && <p>Checkmate!</p>}
          {game.isDraw() && <p>Draw!</p>}
          {game.isStalemate() && <p>Stalemate!</p>}
          {game.isThreefoldRepetition() && <p>Threefold Repetition!</p>}
          <p>Turn: {game.turn() === 'w' ? 'White' : 'Black'}</p>
          <button onClick={() => setGame(new Chess())}>New Game</button>
        </div>
      </div>
    </div>
  );
}

export default App;
