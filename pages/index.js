import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
// import Chat from "../components/chat";
import { Board } from "../components/Board";

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
