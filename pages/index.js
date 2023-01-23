import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
// import Chat from "../components/chat";
import { GiSailboat } from "react-icons/gi";

const Square = ({ handleClick, squareState, index }) => {
  return (
    <div
      onClick={() => handleClick(index)}
      className={squareState.bombed ? styles.bombedGridItem : styles.gridItem}
    />
  );
};

const Board = ({ MyBoard, socket }) => {
  const [board, setBoard] = useState(null);
  const boardSize = 3;

  useEffect(() => {
    const initSquare = {
      bombed: false,
    };
    if (MyBoard) {
      initSquare.boat = false;

      socket.on("wasBombed", (square) => {
        setBoard((oldState) => {
          return oldState.map((state, index) => {
            if (square !== index) return state;
            return { ...state, bombed: true };
          });
        });
      });
    }

    const boardState = [];
    for (let i = 0; i < boardSize * boardSize; i++) {
      boardState.push(initSquare);
    }
    setBoard(boardState);
  }, []);

  const handleClick = MyBoard
    ? () => {}
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
        board.map((square, index) => (
          <Square
            squareState={square}
            index={index}
            handleClick={handleClick}
            key={index}
          />
        ))}
    </div>
  );
};

const Home = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    (async function socketInitializer() {
      if (!socket) {
        await fetch("/api");
        const serverConnection = io();
        setSocket(serverConnection);
      }
    })();
  }, []);

  return (
    <>
      <Head>
        <title>SocketShip</title>
      </Head>

      {socket && (
        <div>
          {/* <Chat /> */}
          <br />
          <Board socket={socket} />
          <br />
          <br />
          <br />
          <Board MyBoard socket={socket} />
        </div>
      )}
    </>
  );
};

export default Home;
