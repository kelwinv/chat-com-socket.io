import React, { useContext, useEffect, useRef, useState } from "react";

import { socket } from "../../services/socket.io";
import { Authentication } from "../../Context/AuthProvider";

import Layout from "./Layout";
import MenuConfig from "../../Components/MenuConfig";

import {
  Container,
  HeaderContainer,
  UserNameContainer,
  Header,
  AdContainer,
  ChatContainer,
  InputForm,
  MessageIcon,
  MessageBox,
  DotsButton,
  DotsSvg,
  MessageContante,
  AuthorMessage,
  Message,
  Alert,
} from "./styles";

interface mensagensBoxListProps {
  author: string;
  message: string;
  id: number;
}

interface alertProps {
  user: string;
  typeAlert: string;
}

const Chat: React.FC = () => {
  const { userName: userNameContext, setIsAuth } = useContext(Authentication);

  const chatEl = useRef<HTMLDivElement>(null);

  const [alertArray, setAlertArray] = useState<alertProps[]>();
  const [userList, setUserList] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [messagens, setMessagens] = useState<mensagensBoxListProps[]>();
  const [showConfig, setShowConfig] = useState(false);

  useEffect(() => {
    socket.on("get users", (users: string[]) => {
      const NewArray = users;
      setUserList(NewArray);
    });

    socket.on("user joined", (userName: string) => {
      const userAlert = {
        user: userName,
        typeAlert: "connected",
      };
      setAlertArray([...(alertArray || []), userAlert]);
      setTimeout(() => setAlertArray([]), 2000);
    });

    socket.on("user disconnected", (userName: string) => {
      if (userName === userNameContext) {
        alert("vc foi desconnectado");
        setIsAuth(false);
      }

      const userAlert = {
        user: userName,
        typeAlert: "disconnect",
      };
      setAlertArray([...(alertArray || []), userAlert]);
      setTimeout(() => setAlertArray([]), 3000);
    });
    // eslint-disable-next-line
  }, [alertArray, userNameContext]);

  useEffect(() => {
    socket.on("get messagens", (mensagensBoxList: mensagensBoxListProps[]) => {
      setMessagens(mensagensBoxList);
      scrollFromNewMessage();
    });

    socket.on("new message", (message: mensagensBoxListProps) => {
      setMessagens([...(messagens || []), message]);
      scrollFromNewMessage();
    });
  }, [messagens]);

  useEffect(() => {
    setTimeout(() => {
      if (chatEl.current) {
        chatEl.current.scrollTop = chatEl.current.scrollHeight;
      }
    }, 200);
  }, []);

  function scrollFromNewMessage() {
    let newMessage = true;
    setTimeout(() => {
      const scrollNow =
        (chatEl.current?.scrollHeight || 0) - (chatEl.current?.scrollTop || 0);
      if (newMessage && scrollNow <= 1000) {
        if (chatEl.current) {
          chatEl.current.scrollTop = chatEl.current.scrollHeight;
        }
      }
      newMessage = false;
    }, 200);
  }

  function handleSendMessage(event: React.MouseEvent) {
    event.preventDefault();
    if (!inputValue) return;
    socket.emit("send message", {
      author: userNameContext,
      message: inputValue,
    });
    setInputValue("");
  }

  return (
    <Container>
      {showConfig && <MenuConfig showFunction={setShowConfig}/>}
      <Layout>
        <HeaderContainer>
          <UserNameContainer>
            <p>Bem vindo {userNameContext}</p>
          </UserNameContainer>
          <Header>
            <span>{userList.join(", ")}</span>
            <DotsButton onClick={() => setShowConfig(!showConfig)}>
              <DotsSvg />
            </DotsButton>
          </Header>
        </HeaderContainer>
        <AdContainer>
          <p>ad</p>
        </AdContainer>
        <ChatContainer
          onLoadStart={() => console.log("loadestart")}
          ref={chatEl}
        >
          {messagens?.map(({ author, message, id }) => {
            let messageClass =
              author === userNameContext ? "thisUser" : undefined;
            return (
              <MessageBox key={id} className={messageClass}>
                <MessageContante className={messageClass}>
                  <AuthorMessage className={messageClass}>
                    {author}
                  </AuthorMessage>
                  <Message>{message}</Message>
                </MessageContante>
              </MessageBox>
            );
          })}
          {alertArray?.map(({ user, typeAlert }) => (
            <Alert key={`${user}${typeAlert}`}>
              {user}{" "}
              {typeAlert === "connected" ? "entrou na sala!" : "saiu da sala"}
            </Alert>
          ))}
        </ChatContainer>
        <InputForm>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" onClick={handleSendMessage}>
            <MessageIcon />
          </button>
        </InputForm>
      </Layout>
    </Container>
  );
};

export default Chat;
