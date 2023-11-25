import React from "react";
import { AuthReducer } from "./AuthReducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContext = React.createContext(null);
