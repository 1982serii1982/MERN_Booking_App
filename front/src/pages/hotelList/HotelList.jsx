import React from "react";
//import { useLocation } from "react-router-dom";
//import dayjs from "dayjs";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

import { styled } from "@mui/material/styles";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import { Header } from "../../components/header/Header";
import { Navbar } from "../../components/navbar/Navbar";
import { SearchResult } from "../../components/searchResult/SearchResult";

import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import styles from "./HotelList.module.css";

export const HotelList = () => {
  const {
    destinationOption,
    startDateOption,
    endDateOption,
    personOption,
    dispatch,
  } = React.useContext(SearchContext);

  const [enableCheckIn, setEnableCheckIn] = React.useState(true);

  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(3000);

  const { data, loading, error, reFetch } = useFetch(
    `/api/hotels/find/byCity?city=${destinationOption}&min=${minPrice}&max=${maxPrice}`
  );

  const handleEdge = (val, ident) => {
    if (ident === "min") {
      if (val < 0) {
        setMinPrice(0);
      }
    } else {
      if (val > 3000) {
        setMaxPrice(3000);
      }
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const setDestinationOption = (value) => {
    dispatch({
      type: "set_search",
      payload: value,
      key: "destinationOption",
    });
  };

  const setStartDateOption = (value) => {
    dispatch({
      type: "set_search",
      payload: value,
      key: "startDateOption",
    });
  };

  const setEndDateOption = (value) => {
    dispatch({
      type: "set_search",
      payload: value,
      key: "endDateOption",
    });
  };

  const setPersonOption = (name, unary, val) => {
    dispatch({
      type: "set_search",
      key: "personOption",
      name,
      unary,
      mode: "uno", //modul care selecteaza cum se incrementeaza
      val,
    });
  };

  const personOptionHandler = (attr, val) => {
    let cleanVal = Math.max(0, val);
    setPersonOption(attr, "i", cleanVal);
  };

  const StyledCalendarButton = styled(IconButton)(({ theme }) => ({
    //Din theme putem lua valorile de default "https://mui.com/material-ui/customization/default-theme/"
    //de exemplu (theme.shape.borderRadius sau theme.palette.mode)
    color: "grey",
    "&:hover": {
      background: "transparent",
    },
  }));

  const StyledDay = styled(PickersDay)(({ theme }) => ({
    // "PickersDay" raspunde de vizualizarea unei anumite zile concrete in calendarul care se deschide
    borderRadius: 5,
  }));

  return (
    <div>
      <Navbar />
      <Header type="custom" />
      <div className={styles.list_container}>
        <div className={styles.list_wrapper}>
          <div className={styles.list_search}>
            <h2 className={styles.list_search_title}>Search</h2>
            <div className={styles.list_search_item}>
              <label htmlFor="dest_input">Destination</label>
              <input
                id="dest_input"
                type="text"
                value={destinationOption}
                onChange={(e) => setDestinationOption(e.target.value)}
              />
            </div>
            <div className={styles.list_search_item}>
              <div className={styles.checkIn}>
                <span>Check-in Date</span>
                <div className={styles.list_search_date}>
                  <DatePicker
                    onChange={(newValue) => setStartDateOption(newValue)}
                    value={startDateOption}
                    disabled={enableCheckIn}
                    className="calendar_hotel_list"
                    format="DD-MM-YYYY"
                    slots={{
                      openPickerIcon: CalendarMonthIcon,
                      openPickerButton: StyledCalendarButton,
                      day: StyledDay,
                    }}
                    slotProps={{
                      openPickerIcon: { fontSize: "small" },
                      //openPickerButton: { color: "secondary" },
                    }}
                  />
                  <span>to</span>
                  <DatePicker
                    onChange={(newValue) => setEndDateOption(newValue)}
                    value={endDateOption}
                    disabled={enableCheckIn}
                    className="calendar_hotel_list"
                    format="DD-MM-YYYY"
                    slots={{
                      openPickerIcon: CalendarMonthIcon,
                      openPickerButton: StyledCalendarButton,
                      day: StyledDay,
                    }}
                    slotProps={{
                      openPickerIcon: { fontSize: "small" },
                    }}
                  />
                </div>
              </div>
              <div className={styles.checkIn_enable}>
                <label htmlFor="check_in">Edit Check-in Date</label>
                <input
                  type="checkbox"
                  id="check_in"
                  onChange={() => setEnableCheckIn((prev) => !prev)}
                />
              </div>
            </div>
            <div className={styles.list_search_item}>
              <span className={styles.options_label}>Options</span>
              <div className={styles.options}>
                <div className={styles.options_item}>
                  <label htmlFor="min">Min price ( per night )</label>
                  <input
                    id="min"
                    type="number"
                    min={0}
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    onBlur={(e) => handleEdge(e.target.value, "min")}
                  />
                </div>
                <div className={styles.options_item}>
                  <label htmlFor="max">Max price ( per night )</label>
                  <input
                    id="max"
                    type="number"
                    max={3000}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    onBlur={(e) => handleEdge(e.target.value, "max")}
                  />
                </div>
                <div className={styles.options_item}>
                  <label htmlFor="adult">Adult</label>
                  <input
                    id="adult"
                    type="number"
                    min={1}
                    value={personOption.adult}
                    onChange={(e) =>
                      personOptionHandler("adult", e.target.value)
                    }
                  />
                </div>
                <div className={styles.options_item}>
                  <label htmlFor="child">Child</label>
                  <input
                    id="child"
                    type="number"
                    min={0}
                    value={personOption.children}
                    onChange={(e) =>
                      personOptionHandler("children", e.target.value)
                    }
                  />
                </div>
                <div className={styles.options_item}>
                  <label htmlFor="room">Room</label>
                  <input
                    id="room"
                    type="number"
                    min={1}
                    value={personOption.room}
                    onChange={(e) =>
                      personOptionHandler("room", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: "100%" }}
              onClick={reFetch}
            >
              Search
            </Button>
          </div>
          <div className={styles.list_result}>
            {loading
              ? "loading"
              : data.map((item, i) => (
                  <SearchResult item={item} key={item._id} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};
