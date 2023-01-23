import Head from "next/head";
// import styles from "../styles/Chat.module.css";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState(["Hola", "Hola amigo, que tall!?"]);
  const [input, setInput] = useState("");

  useEffect(() => {
    (async function socketInitializer() {
      if (!socket) {
        await fetch("/api");
        const serverConnection = io();
        setSocket(serverConnection);
      }
    })();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("connected chat");
      });

      socket.on("chat-message", (msg) => {
        setMessages((oldState) => [...oldState, msg]);
      });
    }
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("chat-message", input);
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

export default Chat;
