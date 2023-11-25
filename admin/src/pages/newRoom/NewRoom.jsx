import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import axiosM from "./../../utils/axiosM";

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import styles from "./NewRoom.module.scss";

const NewRoom = ({ inputs, title }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [selectedHotelID, setSelectedHotelID] = useState("");
  const [rooms, setRooms] = useState("");

  // console.log(selectedHotelID);
  // console.log("newroom");

  const { data, loading } = useFetch("/api/hotels");

  const handleInput = (e) => {
    setUserInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate("/rooms");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const roomNumbers = rooms.split("-").map((item) => ({ number: item }));

    const res = await axiosM.post(
      `/api/rooms/${selectedHotelID}`,
      { ...userInfo, roomNumbers },
      {
        withCredentials: true,
      }
    );
  };

  useEffect(() => {
    //console.log("useeffect");
    setSelectedHotelID(data[0]?._id);
  }, [data]);

  return (
    <div className={styles.new}>
      <Sidebar />
      <div className={styles.newContainer}>
        <Navbar />
        <div className={styles.top}>
          <h1>{title}</h1>
        </div>
        <div className={styles.bottom}>
          <div className={styles.right}>
            <form>
              {inputs.map((input, i) => (
                <div className={styles.formInput} key={i}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={(e) => handleInput(e)}
                    value={!userInfo[input.id] ? "" : userInfo[input.id]}
                    name={input.id}
                  />
                </div>
              ))}

              <div className={styles.formInput}>
                <label>Choose a hotel</label>
                <select onChange={(e) => setSelectedHotelID(e.target.value)}>
                  {loading ? (
                    "loading"
                  ) : data ? (
                    data.map((hotel, i) => (
                      <option value={hotel._id} key={i}>
                        {hotel.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>There is no hotel to select</option>
                  )}
                </select>
              </div>

              <div className={styles.formInput}>
                <label>Room numbers</label>
                <input
                  type="text"
                  placeholder="Type room numbers separated by hyphen (-)"
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}
                />
              </div>

              <div className={styles.buttons}>
                <button type="submit" onClick={(e) => handleSubmit(e)}>
                  Send
                </button>
                <button onClick={(e) => handleBack(e)}>Back</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
