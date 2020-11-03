import React, { useContext } from "react";

import { Authentication} from "./Context/AuthProvider";

import Chat from "./pages/Chat";
import Login from "./pages/Login";

function AuthRoutes() {
  const { isAuth } = useContext(Authentication);

  return (isAuth ? <Chat /> : <Login />);
}

export default AuthRoutes;