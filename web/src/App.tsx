import React from "react";
import AuthRoutes from "./auth.routes";

import { AuthProvider} from "./Context/AuthProvider";

import GlobalStyled from "./styles/GlobalStyled";


function App() {
  return (
    <AuthProvider>
      <AuthRoutes />
      <GlobalStyled />
    </AuthProvider>
  );
}

export default App;