import React from 'react';

const data = Array(25).fill(1);

function Game() {
  return (
    <div className="game-wrapper">
      <div className="controls">
        <div className="dropdown">
          Pick game mode
          <i className="arrow down" />
        </div>
        <input type="string" placeholder="Enter your name" />
        <button>
          PLAY
        </button>
      </div>
      <div className="matrix">
        {data.map(() => (
          <div
            className="circle"
          />
        ))}
      </div>
    </div>
  );
}

export default Game;
