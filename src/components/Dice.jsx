import React, { useState } from "react";

const Dice = ({ onRoll, diceValue }) => {
  const [animate, setAnimate] = useState(false);

  const handleRollClick = () => {
    setAnimate(false);
    setTimeout(() => {
      setAnimate(true);
      onRoll();
    }, 10); 
  };

  const renderDots = () => {
    const dots = [];
    const positions = [
      [],
      [[1, 1]],
      [
        [0, 0],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 0],
        [0, 2],
        [2, 0],
        [2, 2],
      ],
      [
        [0, 0],
        [0, 2],
        [1, 1],
        [2, 0],
        [2, 2],
      ],
      [
        [0, 0],
        [0, 2],
        [1, 0],
        [1, 2],
        [2, 0],
        [2, 2],
      ],
    ];
    positions[diceValue]?.forEach((pos) => {
      const [x, y] = pos;
      dots.push(
        <div
        key={`${x}-${y}`}
        className="absolute w-3 h-3 bg-black rounded-full"
        style={{ top: `${x * 33}%`, left: `${y * 33}%` }}
      ></div>
      
      );
    });
    return dots;
  };

  return (
    <div>
      <div className={` dice ${animate ? "animate" : ""}`}>
        {diceValue && renderDots()}
      </div>
      <button
        onClick={handleRollClick}
        className="px-6 py-3 text-lg cursor-pointer mx-5 my-5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
      >
        Roll Dice
      </button>
    </div>
  );
};

export default Dice;
