import React from 'react';
import BiteSnakeSVG from '../assets/SnakeSVG';
import LadderSVG from '../assets/LadderSVG';

const Board = ({ boardData, snakes, ladders, currentPositions, playerColors }) => {
  return (
    <table className="table-fixed border-collapse">
      {boardData.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((cell) => {
            const playerIndex = currentPositions.findIndex(position => position === cell);
            const snakeBite = snakes[cell];
            const ladderClimb = ladders[cell];
            return (
              <td
                key={cell}
                className={`w-12 h-12 ${
                  playerIndex !== -1 ? playerColors[playerIndex] : cell % 2 === 0 ? 'bg-blue-400' : 'bg-yellow-400'
                } relative text-center align-middle`}
              >
                {cell}
                {snakeBite && (
                  <div className="absolute top-1 right-1 text-center">
                    <BiteSnakeSVG />
                    <div className="absolute inset-0 flex items-center justify-end">
                      <div className="h-4 w-4 bg-white rounded-full text-red-600 text-xs flex items-center justify-center">
                        {snakeBite}
                      </div>
                    </div>
                  </div>
                )}
                {ladderClimb && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <LadderSVG />
                    <div className="h-4 w-4 bg-white rounded-full text-green-600 text-xs flex items-center justify-center mt-6">
                      {ladderClimb}
                    </div>
                  </div>
                )}
              </td>
            );
          })}
        </tr>
      ))}
    </table>
  );
};

export default Board;
