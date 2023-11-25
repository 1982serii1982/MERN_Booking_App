import React from "react";
import dayjs from "dayjs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { Home } from "./pages/home/Home";
import { HotelList } from "./pages/hotelList/HotelList";
import { Hotel } from "./pages/hotel/Hotel";
import { Login } from "./pages/login/Login";

import { SearchContext } from "./context/SearchContext";
import { SearchReducer } from "./reducers/SearchReducer";
import { AuthContext } from "./context/AuthContext";
import { AuthReducer } from "./reducers/AuthReducer";

const theme = createTheme({
  palette: {
    blue: {
      main: "#003580",
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "active" },
          style: {
            color: "white",
            outline: "1px solid white",
          },
        },
        {
          props: { variant: "inactive" },
          style: {
            color: "white",
          },
        },
        {
          props: { variant: "signin" },
          style: {
            color: "#003580",
            outline: "1px solid white",
            backgroundColor: "white",
            textTransform: "none",
            margin: "10px 0",
          },
        },
      ],
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "&.calendar": {
            "& fieldset": {
              border: "none",
            },
            "& input": {
              paddingTop: "10px",
              paddingBottom: "10px",
            },
            borderRadius: "5px",
            backgroundColor: "white",
          },
          "&.calendar_hotel_list": {
            backgroundColor: "white",
            borderRadius: "5px",
            width: "100%",
            "& input": {
              fontSize: "14px",
              padding: "7px",
            },
            "& fieldset": {
              border: "none",
            },
          },
        },
      },
    },
  },
});

const INITIAL_STATE = {
  destinationOption: "",
  startDateOption: dayjs(),
  endDateOption: dayjs(),
  personOption: {
    adult: 1,
    children: 0,
    room: 1,
  },
};

const INITIAL_STATE_AUTH = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

function App() {
  const [state, dispatch] = React.useReducer(SearchReducer, INITIAL_STATE);

  const [stateAuth, dispatchAuth] = React.useReducer(
    AuthReducer,
    INITIAL_STATE_AUTH
  );

  React.useEffect(() => {
    if (stateAuth.user) {
      localStorage.setItem("user", JSON.stringify(stateAuth.user));
    }
  }, [stateAuth.user]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <AuthContext.Provider
          value={{
            user: stateAuth.user,
            loading: stateAuth.loading,
            error: stateAuth.error,
            dispatchAuth,
          }}
        >
          <SearchContext.Provider
            value={{
              destinationOption: state.destinationOption,
              startDateOption: state.startDateOption,
              endDateOption: state.endDateOption,
              personOption: state.personOption,
              dispatch,
            }}
          >
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/hotels" element={<HotelList />} />
                <Route path="/hotels/:id" element={<Hotel />} />
                <Route path="/login" element={<Login />} />
                {/* <Route path="/register" element={<Register />} /> */}
              </Routes>
            </BrowserRouter>
          </SearchContext.Provider>
        </AuthContext.Provider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
