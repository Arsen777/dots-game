import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

import useFetch from 'hooks/useFetch';
import shuffle from 'helpers/shuffle';
import { LOADED } from 'constants/data';
import { EASY, NORMAL, DIFFICULt } from 'constants/games';

function Game() {
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timerHasStarted, setTimerHasStarted] = useState(false);
  const [result, setResult] = useState({});
  const [message, setMessage] = useState();
  const [currentMode, setCurrentMode] = useState(EASY);
  const {
    response: gameSettings = {},
    status: gameSettingsLoadingStatus,
  } = useFetch('/server/game-settings.json');
  const [gameData, setGameData] = useState([]);
  const shuffledData = useMemo(() => shuffle(gameData), [gameData]);

  const [rows, columns] = gameSettings[currentMode]
    ? gameSettings[currentMode].field.split('x')
    : [];

  const handleSquareClick = (id) => {
    if (timerHasStarted && result[id] === 'blue') {
      setResult((prevResult) => ({
        ...prevResult,
        [id]: 'green',
      }));
    }
  };

  const resetGame = () => {
    setResult({});
    setMessage(null);
    setCurrentIndex(0);
  };

  const handlePlay = () => {
    resetGame();
    setGameHasStarted(true);
  };

  const handleGameModeClick = () => {
    setIsDropdownOpen((open) => !open);
  };

  const handleModeChange = (mode) => {
    setCurrentMode(mode);
    setIsDropdownOpen(false);
    resetGame();
  };

  useEffect(() => {
    if (
      gameSettingsLoadingStatus === LOADED &&
      gameSettings[currentMode].field
    ) {
      const [rows, columns] = gameSettings[currentMode].field.split('x');
      const gameSquares = new Array(Number(rows) * Number(columns))
        .fill(1)
        .map((el, index) => ({
          id: index,
        }));
      setGameData(gameSquares);
    }
  }, [gameSettings, gameSettingsLoadingStatus, currentMode]);

  useEffect(() => {
    const resultsArray = Object.values(result);
    const greens = resultsArray.filter((result) => result === 'green');
    const reds = resultsArray.filter((result) => result === 'red');
    const half = Math.floor(gameData.length / 2);

    if (greens.length > half) {
      setGameHasStarted(false);
      setCurrentIndex(0);
      setMessage('Congrats! You have won');
      return;
    } else if (reds.length > half) {
      setGameHasStarted(false);
      setCurrentIndex(0);
      setMessage('You have lost. Try again');
      return;
    }

    if (gameData.length && gameHasStarted) {
      const game = gameData[currentIndex];

      if (!game) return;

      setTimerHasStarted(true);

      setResult((prevResult) => ({
        ...prevResult,
        [game.id]: 'blue',
      }));

      setTimeout(() => {
        setResult((prevResult) => ({
          ...prevResult,
          [game.id]: prevResult[game.id] === 'green' ? 'green' : 'red',
        }));

        setTimerHasStarted(false);
        setCurrentIndex((index) => index + 1);
      }, 1000);
    }
  }, [gameHasStarted, gameData, currentIndex]);

  return (
    <div className="game-wrapper">
      <div className="controls">
        <div className="game-mode-dropdown">
          <div className="game-mode" onClick={handleGameModeClick}>
            Pick game mode
            <i className="arrow down" />
          </div>
          <div className={classNames('dropdown', { open: isDropdownOpen })}>
            {[EASY, NORMAL, DIFFICULt].map((mode) => (
              <div
                className={classNames('mode', {
                  selected: currentMode === mode,
                })}
                onClick={() => handleModeChange(mode)}
              >
                {mode}
              </div>
            ))}
          </div>
        </div>
        <input type="string" placeholder="Enter your name" />
        <button
          disabled={gameSettingsLoadingStatus !== LOADED}
          onClick={handlePlay}
        >
          {message ? 'PLAY AGAIN' : 'PLAY'}
        </button>
      </div>
      <div className="message">{message && <span>{message}</span>}</div>
      <div className="matrix">
        {rows &&
          Array(Number(rows))
            .fill(1)
            .map((el, index) => (
              <div className="row">
                {shuffledData
                  .slice(index * Number(rows), Number(rows) * (index + 1))
                  .map((data) => (
                    <div className="column" key={data.id}>
                      <div
                        className={classNames('circle', result[data.id])}
                        onClick={() => handleSquareClick(data.id)}
                      />
                    </div>
                  ))}
              </div>
            ))}
      </div>
    </div>
  );
}

export default Game;
