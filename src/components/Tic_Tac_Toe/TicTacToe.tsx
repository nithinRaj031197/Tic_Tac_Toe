import { FC, useRef, useState } from "react";
import "./TicTacToe.css";

import nought_icon from "../../assets/circle.png";
import cross_icon from "../../assets/cross.png";

const TicTacToe: FC = () => {
  const [data, setData] = useState<Array<string>>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  const toggle = (num: number) => {
    if (lock || data[num] !== "") {
      return;
    }

    const newData = [...data];

    if (count % 2 === 0) {
      newData[num] = "x";
    } else {
      newData[num] = "o";
    }

    setCount((prev) => prev + 1);
    setData(newData);
    checkWin(newData);
  };

  const checkWin = (newData: Array<string>) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const condition of winConditions) {
      const [a, b, c] = condition;
      if (
        newData[a] &&
        newData[a] === newData[b] &&
        newData[a] === newData[c]
      ) {
        won(newData[a]);
        return;
      }
    }

    if (count === 8) {
      // All cells filled, it's a draw
      won("draw");
    }
  };

  const won = (winner: string) => {
    setLock(true);
    if (titleRef.current) {
      titleRef.current.innerHTML = "Congratulations: ";
      const img = document.createElement("img");
      img.src = winner === "x" ? cross_icon : nought_icon;
      img.style.height = "50px";
      titleRef.current.appendChild(img);
    }
  };

  const reset = () => {
    setLock(false);
    setData(["", "", "", "", "", "", "", "", ""]);
    setCount(0);
    if (titleRef.current) {
      titleRef.current.innerHTML = "Tic Tac Toe game In <span>React</span>";
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="title" ref={titleRef}>
          Tic Tac Toe game In <span>React</span>
        </h1>
        <div className="board">
          <div className="row1">
            {data.slice(0, 3).map((cell, index) => (
              <div className="boxes" key={index} onClick={() => toggle(index)}>
                {cell === "x" && <img src={cross_icon} alt="X" />}
                {cell === "o" && <img src={nought_icon} alt="O" />}
              </div>
            ))}
          </div>
          <div className="row2">
            {data.slice(3, 6).map((cell, index) => (
              <div
                className="boxes"
                key={index + 3}
                onClick={() => toggle(index + 3)}
              >
                {cell === "x" && <img src={cross_icon} alt="X" />}
                {cell === "o" && <img src={nought_icon} alt="O" />}
              </div>
            ))}
          </div>
          <div className="row3">
            {data.slice(6).map((cell, index) => (
              <div
                className="boxes"
                key={index + 6}
                onClick={() => toggle(index + 6)}
              >
                {cell === "x" && <img src={cross_icon} alt="X" />}
                {cell === "o" && <img src={nought_icon} alt="O" />}
              </div>
            ))}
          </div>
        </div>
        <div className="reset" onClick={reset}>
          Reset
        </div>
      </div>
    </>
  );
};

export default TicTacToe;
