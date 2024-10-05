import React, { useState } from 'react';
import BiteSnakeSVG from '../assets/SnakeSVG';

const availableColors = [
  { name: 'Red', class: 'bg-red-500' },
  { name: 'Green', class: 'bg-green-500' },
  { name: 'Blue', class: 'bg-blue-500' },
  { name: 'Yellow', class: 'bg-yellow-500' }
];

const PlayerSelection = ({ onPlayersSelected }) => {
  const [numPlayers, setNumPlayers] = useState(0);
  const [playerNames, setPlayerNames] = useState([]);
  const [playerColors, setPlayerColors] = useState([]);
  const [error, setError] = useState('');

  const handlePlayerNumberSelect = (number) => {
    setNumPlayers(number);
    setPlayerNames(Array(number).fill(''));
    setPlayerColors(Array(number).fill(''));
    setError('');
  };

  const handleNameChange = (index, name) => {
    const names = [...playerNames];
    names[index] = name;
    setPlayerNames(names);
  };

  const handleColorChange = (index, color) => {
    const colors = [...playerColors];
    colors[index] = color;
    setPlayerColors(colors);
  };

  const handleStartGame = () => {
    if (playerNames.some(name => name.trim() === '') || playerColors.some(color => color === '')) {
      setError('Please enter player names with colors.');
      return;
    }
    setError('');
    onPlayersSelected(playerNames, playerColors);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <h2 className="text-white text-4xl font-bold mb-6">Assignment for LearningMate</h2>
     <div className='flex items-center'>
    <span className='mb-2'>
    <BiteSnakeSVG />
    </span>
     <h2 className="text-yellow-500 text-4xl font-bold mb-6 animate-pulse">Snake and Ladder Game</h2>
     </div>
      <h2 className="text-white text-2xl font-bold mb-6">Select Number of Players</h2>
      
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => handlePlayerNumberSelect(1)}
          className="btn-player-select bg-green-500 hover:bg-green-600 p-2 rounded"
        >
          1 Player
        </button>
        <button
          onClick={() => handlePlayerNumberSelect(2)}
          className="btn-player-select bg-blue-500 hover:bg-blue-600 p-2 rounded"
        >
          2 Players
        </button>
        <button
          onClick={() => handlePlayerNumberSelect(4)}
          className="btn-player-select bg-yellow-500 hover:bg-yellow-600 p-2 rounded"
        >
          4 Players
        </button>
      </div>

      {numPlayers > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h3 className="text-xl font-semibold mb-4 text-center">Enter Player Names & Select Colors</h3>
          {playerNames.map((_, index) => (
            <div key={index} className="mt-4 flex items-center space-x-4">
              <input
                type="text"
                required
                placeholder={`Player ${index + 1} Name`}
                value={playerNames[index]}
                onChange={(e) => handleNameChange(index, e.target.value)}
                className="input-player w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <select
                value={playerColors[index]}
                onChange={(e) => handleColorChange(index, e.target.value)}
                className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Color</option>
                {availableColors.map((color) => (
                  <option key={color.class} value={color.class}>
                    {color.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            onClick={handleStartGame}
            className={`w-full mt-6 py-3 rounded-lg ${
              playerNames.some(name => name.trim() === '') || playerColors.some(color => color === '') 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-purple-500 hover:bg-purple-600 transition duration-300 text-white'
            }`}
          >
            Start Game
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayerSelection;
