import React, { useContext, useEffect, useState } from "react";
import { Authentication } from "../../Context/AuthProvider";
import { socket } from "../../services/socket.io";

import { Container, Header, FontConfig, Buttons, ArrowLeftSvg } from "./styles";

interface MenuConfig {
  showFunction: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuConfig: React.FC<MenuConfig> = ({ showFunction }) => {
  const { setIsAuth } = useContext(Authentication);

  const [font, setFont] = useState(0);
  const [userList, setUserList] = useState<string[]>([]);

  const membrosOn = 8;

  useEffect(() => {
    socket.on("get users", (users: string[]) => {
      const NewArray = users;
      setUserList(NewArray);
    });
  });

  function HandleDisconnect(){
    socket.emit('exit chat')
    setIsAuth(false)
  }

  return (
    <Container>
      <Header>
        <p>
          {membrosOn} usuarios online: {userList.join(", ")}
        </p>
      </Header>
      <main>
        <FontConfig>
          <p>Tamanho da fonte:</p>
          <select
            name="font"
            id="font"
            value={font}
            onChange={(e) => setFont(Number(e.target.value))}
          >
            <option value={0}>Pequena</option>
            <option value={1}>Media</option>
            <option value={2}>Grande</option>
          </select>
        </FontConfig>
        <Buttons>
          <button className="exitChat" onClick={HandleDisconnect}>
            <ArrowLeftSvg />
            Sair do chat
          </button>
          <button className="exitConfig" onClick={() => showFunction(false)}>
            Ok
          </button>
        </Buttons>
      </main>
    </Container>
  );
};

export default MenuConfig;
