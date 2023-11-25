import React from "react";
import axiosM from "./utils/axiosM";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import NewUser from "./pages/newUser/NewUser";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { userInputs, hotelInputs, roomInputs } from "./formSource";
import { userColumns, hotelColumns, roomColumns } from "./datatablesource";

import { DarkModeContext } from "./context/DarkMode/darkModeContext";
import { AuthContext } from "./context/Auth/AuthContext";

import "./style/dark.scss";

function App() {
  const { darkMode } = React.useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { state } = React.useContext(AuthContext);
    const [loading, setLoading] = React.useState(true);
    //console.log(0);
    //console.log("use protected");

    const auth = React.useRef(false);

    React.useEffect(() => {
      //console.log("use ref");
      //la primul reload (daca user este si tokenul este valabil) ordinea este 07126 3509, dupa care orice trecere dupa alt link 'users sau 'hotels' ne da doar 0
      //la primul reload (daca user nu este si tokenul nu este valabil) ordinea este 07126 4508, dupa care orice trecere dupa alt link 'users sau 'hotels' ne da doar 0
      //console.log(1);
      const checkAuth = async (url) => {
        setLoading(true);
        //console.log(2);
        try {
          await axiosM.get(url, { withCredentials: true });
          auth.current = true;
          //console.log(3);
        } catch (error) {
          auth.current = false;
          //console.log(4);
        }
        setLoading(false);
        //console.log(5);
      };

      checkAuth("api/users/checkadmin");
      //console.log(6);
    }, []);

    if (loading) {
      //console.log(7);
      return;
    }

    if (!state.user || !auth.current) {
      //console.log(8);
      return <Navigate to="/login" />;
    }

    //console.log(9);
    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="users">
            <Route
              index
              element={
                <ProtectedRoute>
                  <List source={userColumns} type="users" />
                </ProtectedRoute>
              }
            />
            <Route
              path=":userId"
              element={
                <ProtectedRoute>
                  <Single />
                </ProtectedRoute>
              }
            />
            <Route
              path="new"
              element={
                <ProtectedRoute>
                  <NewUser inputs={userInputs} title="Add New User" />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="hotels">
            <Route
              index
              element={
                <ProtectedRoute>
                  <List source={hotelColumns} type="hotels" />
                </ProtectedRoute>
              }
            />
            <Route
              path=":hotelId"
              element={
                <ProtectedRoute>
                  <Single />
                </ProtectedRoute>
              }
            />
            <Route
              path="new"
              element={
                <ProtectedRoute>
                  <NewHotel inputs={hotelInputs} title="Add New Hotel" />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="rooms">
            <Route
              index
              element={
                <ProtectedRoute>
                  <List source={roomColumns} type="rooms" />
                </ProtectedRoute>
              }
            />
            <Route
              path=":roomId"
              element={
                <ProtectedRoute>
                  <Single />
                </ProtectedRoute>
              }
            />
            <Route
              path="new"
              element={
                <ProtectedRoute>
                  <NewRoom inputs={roomInputs} title="Add New Room" />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
