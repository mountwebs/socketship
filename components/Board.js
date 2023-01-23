import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { GiSailboat } from "react-icons/gi";

const initBoard = (boardSize, MyBoard) => {
  const board = [];
  const square = {
    bombed: false,
  };
  if (MyBoard) {
    square.boat = false;
  }

  for (let i = 0; i < boardSize * boardSize; i++) {
    board.push(square);
  }
  return board;
};

export const Board = ({ MyBoard, socket }) => {
  const [board, setBoard] = useState(null);
  const boardSize = 3;

  useEffect(() => {
    socket.on("new player", () => {
      console.log("new player");
      setBoard(initBoard(boardSize, MyBoard));
    });

    if (MyBoard) {
      socket.on("wasBombed", (square) => {
        setBoard((oldState) => {
          return oldState.map((state, index) => {
            if (square !== index) return state;
            return { ...state, bombed: true };
          });
        });
      });
    }

    return () => socket.emit("leaving");
  }, []);

  const handleClick = MyBoard
    ? (clickedSquare) => {
        setBoard((oldState) => {
          return oldState.map((state, index) => {
            if (clickedSquare !== index) return state;
            return { ...state, boat: true };
          });
        });
      }
    : (clickedSquare) => {
        socket.emit("BOMBING", clickedSquare);
        setBoard((oldState) => {
          return oldState.map((state, index) => {
            if (clickedSquare !== index) return state;
            return { ...state, bombed: true };
          });
        });
      };

  return (
    <div
      className={styles.grid}
      style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}
    >
      {board &&
        board.map((squareState, index) => (
          <div
            onClick={() => handleClick(index)}
            className={
              squareState.bombed ? styles.bombedGridItem : styles.gridItem
            }
            key={index}
          >
            {squareState.boat && <GiSailboat color="red" size={70} />}
          </div>
        ))}
    </div>
  );
};
