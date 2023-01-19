import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
let socket;

const Home = () => {
  const [messages, setMessages] = useState(["yoooo"]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("update-input", (msg) => {
      setMessages([...messages, msg]);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("input-change", input);
  };

  return (
    <>
      <Head>
        <title>SocketShip</title>
      </Head>

      <div>
        <div>
          {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Type something"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
};

export default Home;
