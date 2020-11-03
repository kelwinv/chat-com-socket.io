import React, { useState } from "react";

import { socket } from "../../services/socket.io";

import { Container } from "./styles";

const Home: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [authFail, setAuthFail] = useState<Boolean>(false);

  function handleLoginInChat(event: React.MouseEvent) {
    event.preventDefault();
    if (!inputValue) return;
    socket.connect();
    socket.emit("add user", inputValue);
    socket.on("auth fail", (res: Boolean) => setAuthFail(res));
  }

  return (
    <Container>
      <h1>Olá como podemos te chamar?</h1>
      <form action="">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" onClick={handleLoginInChat}>
          ENTRAR
        </button>
      </form>
      {authFail ? <p>já existe um usuario com esse nome online</p> : null}
      <span role="img" aria-label="Feito com amor por">
        Feito com 💜 por{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/kelwin-vieira"
        >
          Kelwin Vieira
        </a>
      </span>
    </Container>
  );
};

export default Home;
