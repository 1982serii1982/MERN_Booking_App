import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { Home } from "./pages/home/Home";
import { HotelList } from "./pages/hotelList/HotelList";
import { Hotel } from "./pages/hotel/Hotel";

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

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hotels" element={<HotelList />} />
            <Route path="/hotels/:id" element={<Hotel />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
