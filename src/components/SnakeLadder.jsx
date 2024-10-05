import React, { useState } from "react";
import PlayerSelection from "./PlayerSelection";
import Board from "./Board";
import Dice from "./Dice";
import diceRollSound from "../soundEffects/Dice.mp3";
import snakeBiteSound from "../soundEffects/Kill.mp3";
import ladderClimbSound from "../soundEffects/Climb.mp3";
import winSound from "../soundEffects/Win.mp3";

const generateBoard = (size) => {
  let board = [];
  let cell = size * size;
  for (let row = 0; row < size; row++) {
    let rowCells = [];
    for (let col = 0; col < size; col++) {
      rowCells.push(cell--);
    }
    if (row % 2 === 1) {
      rowCells.reverse();
    }
    board.push(rowCells);
  }
  return board;
};

const MainGame = () => {
  const boardSize = 10;
  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState([]);
  const [playerColors, setPlayerColors] = useState([]);
  const [currentPositions, setCurrentPositions] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentDiceValue, setCurrentDiceValue] = useState(null);
  const [winner, setWinner] = useState(null);

  const snakes = {
    99: 26,
    95: 24,
    89: 53,
    74: 47,
    62: 18,
    49: 11,
    46: 5,
  };

  const ladders = {
    2: 23,
    8: 34,
    20: 38,
    28: 76,
    40: 59,
    63: 81,
    71: 91,
  };

  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.play();
  };

  const startGame = (playerNames, colors) => {
    setPlayers(playerNames);
    setPlayerColors(colors);
    setCurrentPositions(Array(playerNames.length).fill(1));
    setGameStarted(true);
  };

  const rollDice = () => {
    playSound(diceRollSound);
    const newDiceValue = Math.floor(Math.random() * 6) + 1;
    setCurrentDiceValue(newDiceValue);

    let newPositions = [...currentPositions];
    let newPosition = newPositions[currentPlayerIndex] + newDiceValue;
    newPosition =
      newPosition > 100 ? newPositions[currentPlayerIndex] : newPosition;

    if (snakes[newPosition]) {
      playSound(snakeBiteSound);
    } else if (ladders[newPosition]) {
      playSound(ladderClimbSound);
    }

    newPosition = snakes[newPosition] || ladders[newPosition] || newPosition;
    newPositions[currentPlayerIndex] = newPosition;
    setCurrentPositions(newPositions);

    if (newPosition === 100) {
      playSound(winSound);
      setWinner(players[currentPlayerIndex]);
    } else {
      setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
    }
  };

  const resetGame = () => {
    setPlayers(players);
    setCurrentPositions(Array(players.length).fill(1));
    setCurrentPlayerIndex(0);
    setCurrentDiceValue(null);
    setWinner(null);
  };
  const handleMainMenu = () => {
    setGameStarted(false);
    setWinner(null);
  };

  return (
    <div className="game-container relative">
      {!gameStarted ? (
        <PlayerSelection onPlayersSelected={startGame} />
      ) : (
        <div className="flex flex-col items-center ">
          <div className="flex space-x-6 mb-2 mt-4 border p-2 rounded">
          <h2 className="text-xl font-bold">Players: </h2>
            {players.map((player, index) => {
               const isCurrentPlayer = index === currentPlayerIndex;
              return (
                <div
                  key={index}
                  className={`px-4 rounded ${playerColors[index]} ${
                    isCurrentPlayer ? 'animate-bounce' : ''
                  }`}
                >
                  {player}
                </div>
              );
            })}
          </div>

          <Board
            boardData={generateBoard(boardSize)}
            snakes={snakes}
            ladders={ladders}
            currentPosition={currentPositions[currentPlayerIndex]}
            players={players}
            currentPositions={currentPositions}
            playerColors={playerColors}
          />
          <Dice onRoll={rollDice} diceValue={currentDiceValue} />
        </div>
      )}

      {winner && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center animate-bounce">
            <h2 className="text-3xl font-bold mb-4">
              Congratulations, {winner}
            </h2>
            <p className="mb-6 text-lg">You've won the game!</p>
            <div className="flex gap-4">
              <button
                onClick={resetGame}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300"
              >
                Restart
              </button>
              <button
                onClick={handleMainMenu}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition duration-300"
              >
                Back to Main Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainGame;
