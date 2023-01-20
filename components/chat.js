export const Chat = ({ socket }) => {
  const [messages, setMessages] = useState(["yoooo"]);
  const [input, setInput] = useState("");

  return (
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
  );
};
