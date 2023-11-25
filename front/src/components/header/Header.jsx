import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

import { styled } from "@mui/material/styles";

import Icon from "@mui/material/Icon";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import HotelIcon from "@mui/icons-material/Hotel";
import FlightIcon from "@mui/icons-material/Flight";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import AttractionsIcon from "@mui/icons-material/Attractions";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";

import { useOutsideClick } from "../../hooks/useOutsideClick";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Header.module.css";

export const Header = ({ type }) => {
  const navigate = useNavigate();

  const {
    destinationOption,
    startDateOption,
    endDateOption,
    personOption,
    dispatch,
  } = React.useContext(SearchContext);

  const { user, loading, error, dispatchAuth } = React.useContext(AuthContext);

  /////////////////// STATES //////////////////////////////
  const [listData, setListData] = React.useState([
    {
      id: 1,
      iconTitle: HotelIcon,
      spanTitle: "Stays",
      tabClicked: true,
    },
    {
      id: 2,
      iconTitle: FlightIcon,
      spanTitle: "Flights",
      tabClicked: false,
    },
    {
      id: 3,
      iconTitle: DirectionsCarIcon,
      spanTitle: "Car rental",
      tabClicked: false,
    },
    {
      id: 4,
      iconTitle: AttractionsIcon,
      spanTitle: "Attractions",
      tabClicked: false,
    },
    {
      id: 5,
      iconTitle: LocalTaxiIcon,
      spanTitle: "Airport Taxis",
      tabClicked: false,
    },
  ]);

  const [openPersonOption, setOpenPersonOption] = React.useState(false);

  ////////////////// HANDLERS ////////////////////////////

  const handleHeaderList = (id) => {
    setListData(
      listData.map((item) => {
        if (item.id === id) {
          return { ...item, tabClicked: true };
        }

        return { ...item, tabClicked: false };
      })
    );
  };

  const personOptionHandler = () => {
    ////Varianta 1////
    // setOpenPersonOption((prevState) => {
    //   return !prevState;
    // });

    ////Varianta 2////
    setOpenPersonOption(!openPersonOption);
  };

  const searchButtonHandler = () => {
    navigate("/hotels");
  };

  //////////////// OUTSIDE CLICK HANDLE - START //////////////

  const handleClickOutside = () => {
    setOpenPersonOption(false);
  };

  const refPerson = useOutsideClick(handleClickOutside);

  //////////////// OUTSIDE CLICK HANDLE - END //////////////
  //------------------------------------------------------------------------------------------------------/
  //////////////// CONTROL BUTTON HANDLE - START //////////////setStartDateOption

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

  const setPersonOption = (name, unary) => {
    dispatch({
      type: "set_search",
      key: "personOption",
      name,
      unary,
    });
  };

  //////////////// CONTROL BUTTON HANDLE - END //////////////
  //------------------------------------------------------------------------------------------------------/

  /////////////////////////  MUI COMPONENT STYLING ////////////////////////////

  //Aici avem una dintre metodele de custom stilizare cu ajutorul
  //"styled"
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
    <div className={styles.header}>
      <div
        className={
          type !== "custom"
            ? styles.header_container
            : styles.header_container_hotelList
        }
      >
        <div className={styles.header_list}>
          {listData.map((item, i) => (
            <Button
              onClick={() => handleHeaderList(item.id)}
              key={i}
              sx={{
                ":hover": {
                  //backgroundColor: "#01579b",
                  outline: "1px solid white",
                },
              }}
              //color="ochre"
              variant={item.tabClicked ? "active" : "inactive"}
              startIcon={<Icon component={item.iconTitle} />}
            >
              <span>{item.spanTitle}</span>
            </Button>
          ))}
        </div>
        {type !== "custom" && (
          <>
            <h1 className={styles.header_title}>
              A lifetime of discounts?It's Genius
            </h1>
            <p className={styles.header_desc}>
              Get rewarded for your travels - unlock instants savings of 10% or
              more with a free Hotel booking account
            </p>
            {!user && (
              <Link>
                <Button
                  sx={{
                    margin: "0",
                    ":hover": {
                      backgroundColor: "#01579b",
                      outline: "1px solid white",
                      color: "white",
                    },
                  }}
                  variant="signin"
                  className={styles.header_btn}
                >
                  Sign In/ Register
                </Button>
              </Link>
            )}

            <div className={styles.header_search}>
              <div className={styles.header_search_item}>
                <HotelIcon
                  //sx={{ fontSize: 40 }}
                  className={styles.header_search_icon}
                />
                <input
                  type="text"
                  className={styles.header_search_input}
                  placeholder="Where are you going"
                  onChange={(e) => setDestinationOption(e.target.value)}
                  value={destinationOption}
                />
              </div>
              <div className={styles.header_search_calendar}>
                <DatePicker
                  onChange={(newValue) => setStartDateOption(newValue)}
                  value={startDateOption}
                  className="calendar"
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
                  className="calendar"
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
              <div className={styles.header_search_person}>
                <div
                  ref={refPerson}
                  onClick={personOptionHandler}
                  className={styles.header_search_person_visible}
                >
                  <PersonIcon
                    //sx={{ fontSize: 40 }}
                    className={styles.header_search_icon}
                  />
                  <span
                    className={styles.header_search_text}
                  >{`${personOption.adult} adult - ${personOption.children} children - ${personOption.room} room`}</span>
                </div>
                {openPersonOption && (
                  <div
                    className={styles.options}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <div className={styles.options_item}>
                      <span className={styles.options_title}>Adult</span>
                      <div className={styles.options_control}>
                        <button
                          className={styles.options_control_button}
                          onClick={() => setPersonOption("adult", "d")}
                          disabled={personOption.adult < 1 ? true : false}
                        >
                          -
                        </button>
                        <span
                          className={styles.options_control_text}
                        >{`${personOption.adult}`}</span>
                        <button
                          className={styles.options_control_button}
                          onClick={() => setPersonOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className={styles.options_item}>
                      <span className={styles.options_title}>Children</span>
                      <div className={styles.options_control}>
                        <button
                          className={styles.options_control_button}
                          onClick={() => setPersonOption("children", "d")}
                          disabled={personOption.children < 1 ? true : false}
                        >
                          -
                        </button>
                        <span
                          className={styles.options_control_text}
                        >{`${personOption.children}`}</span>
                        <button
                          className={styles.options_control_button}
                          onClick={() => setPersonOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className={styles.options_item}>
                      <span className={styles.options_title}>Room</span>
                      <div className={styles.options_control}>
                        <button
                          className={styles.options_control_button}
                          onClick={() => setPersonOption("room", "d")}
                          disabled={personOption.room < 1 ? true : false}
                        >
                          -
                        </button>
                        <span
                          className={styles.options_control_text}
                        >{`${personOption.room}`}</span>
                        <button
                          className={styles.options_control_button}
                          onClick={() => setPersonOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.header_search_item}>
                <Button variant="contained" onClick={searchButtonHandler}>
                  Search
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
