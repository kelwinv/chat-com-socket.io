import React, { useState } from "react";

import { socket } from "../services/socket.io";

interface AuthContextData {
  isAuth: boolean;
  userName: string;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Authentication = React.createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userName, setUserName] = useState("");

  socket.on("login", (response: AuthContextData) => {
    const { isAuth, userName } = response;

    setIsAuth(isAuth);
    setUserName(userName);
  });

  return (
    <Authentication.Provider value={{ isAuth, userName, setIsAuth }}>
      {children}
    </Authentication.Provider>
  );
};
