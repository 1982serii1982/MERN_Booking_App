import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { DarkModeContextProvider } from "./context/DarkMode/darkModeContext.js";
import { AuthContextProvider } from "./context/Auth/AuthContext.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <DarkModeContextProvider>
      <App />
    </DarkModeContextProvider>
  </AuthContextProvider>
);
