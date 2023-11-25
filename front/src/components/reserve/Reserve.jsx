import React from "react";
import { Box, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useFetch from "../../hooks/useFetch";
import axiosM from "./../../utils/axiosM";

import { SearchContext } from "../../context/SearchContext";
import styles from "./Reserve.module.css";

export const Reserve = ({ open, setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = React.useState([]);

  //Acest use fetch se executa de fiecare data cind Reserve se reinnoieste
  //dar useEffect din useFetch se executa o singura data (prima data) si
  //urmatoarea data cind se schimba url
  const { data, loading, error } = useFetch(`/api/hotels/room/${hotelId}`);
  const { startDateOption, endDateOption } = React.useContext(SearchContext);

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
      setOpen(false);
    }
  };

  const handleSelect = (e) => {
    setSelectedRooms(
      e.target.checked
        ? [...selectedRooms, e.target.value]
        : selectedRooms.filter((item) => item !== e.target.value)
    );
  };

  const getBookedDates = (startDate, endDate) => {
    let list = [];

    let startUnix = startDate
      .set("hour", 0)
      .set("minute", 0)
      .set("second", 0)
      .unix();

    let endUnix = endDate
      .set("hour", 0)
      .set("minute", 0)
      .set("second", 0)
      .unix();

    while (startUnix < endUnix) {
      list.push(startUnix);
      startUnix += 24 * 60 * 60;
    }

    return list;
  };

  const isAvailable = (bookedDays, busyDays) => {
    return !bookedDays.every((item) => !busyDays.includes(item));
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomNumberId) => {
          const { data } = axiosM.patch(
            `api/rooms/availability/${roomNumberId}`,
            { dates: getBookedDates(startDateOption, endDateOption) }
          );
        })
      );
    } catch (error) {}
  };

  const styleWrapper = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    bgcolor: "#febb02",
    padding: "10px",
    borderRadius: "5px",
  };

  const styleButton = {
    padding: "0",
    margin: "0",
    display: "flex",
    borderRadius: "10px",
    border: "none",
    outline: "1px solid black",
    cursor: "pointer",
    backgroundColor: "#003580",
    color: "white",
  };

  const styleBookButton = {
    cursor: "pointer",
    padding: "10px",
    backgroundColor: "#003580",
    color: "white",
    border: "none",
    fontSize: "15px",
    borderRadius: "5px",
  };

  const styleHeader = {
    borderBottom: "1px solid black",
    padding: "5px",
    display: "flex",
    justifyContent: "end",
  };

  const styleBody = {};

  const styleFooter = {
    borderTop: "1px solid black",
    padding: "5px",
    display: "flex",
    justifyContent: "end",
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="div" sx={styleWrapper}>
          <Box component="div" sx={styleHeader}>
            <Box
              component="button"
              sx={styleButton}
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </Box>
          </Box>
          <Box component="div" sx={styleBody}>
            <h3>Select your room:</h3>
            {!loading &&
              data.rooms.map((item) => (
                <div className={styles.room_item} key={item._id}>
                  <div className={styles.room_info}>
                    <div className={styles.room_title}>{item.title}</div>
                    <div className={styles.room_desc}>{item.desc}</div>
                    <div className={styles.room_max}>
                      Max people: <b>{item.maxPeople}</b>
                    </div>
                    <div className={styles.room_price}>
                      Price is: <b>£{item.price}</b>
                    </div>
                  </div>
                  <div className={styles.room_select}>
                    {item.roomNumbers.map((obj, i) => (
                      <div className={styles.room_number} key={obj._id}>
                        <label htmlFor={`room_${i}`}>{obj.number}</label>
                        <input
                          disabled={isAvailable(
                            getBookedDates(startDateOption, endDateOption),
                            obj.unavailableDates
                          )}
                          type="checkbox"
                          id={`room_${i}`}
                          value={obj._id}
                          onClick={(e) => handleSelect(e)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </Box>
          <Box component="div" sx={styleFooter}>
            <Box component="button" sx={styleBookButton} onClick={handleClick}>
              Book Now!
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
