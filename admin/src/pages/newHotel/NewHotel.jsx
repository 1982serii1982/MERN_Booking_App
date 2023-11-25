import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { md5 } from "js-md5";
import axiosM from "./../../utils/axiosM";
import { imageDB } from "../../utils/configFireBase";
import useFetch from "../../hooks/useFetch";

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

import styles from "./NewHotel.module.scss";

const NewHotel = ({ inputs, title }) => {
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [selectedFeature, setSelectedFeature] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);

  const { data, loading } = useFetch("/api/rooms");

  const handleInput = (e) => {
    setUserInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate("/hotels");
  };

  const handleFiles = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSelectRoom = (e) => {
    setSelectedRooms(
      Array.from(e.target.selectedOptions, (option) => option.value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const infoToSend = { ...userInfo };

    const urlArray = await Promise.all(
      files.map(async (item, i) => {
        const imgRef = ref(
          imageDB,
          `booking_app_images/hotels/${md5(userInfo.address)}/${md5(
            userInfo.address.concat(i)
          )}`
        );

        const imageRef = await uploadBytes(imgRef, item);
        return await getDownloadURL(imageRef.ref);
      })
    );

    infoToSend.photos = urlArray;
    infoToSend.rooms = selectedRooms;

    const res = await axiosM.post("/api/hotels", infoToSend, {
      withCredentials: true,
    });
  };

  return (
    <div className={styles.new}>
      <Sidebar />
      <div className={styles.newContainer}>
        <Navbar />
        <div className={styles.top}>
          <h1>{title}</h1>
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            {files.length !== 0
              ? files.map((item, i) => (
                  <img src={URL.createObjectURL(item)} alt="" key={i} />
                ))
              : "No image"}
          </div>
          <div className={styles.right}>
            <form>
              <div className={styles.formHeader}>
                <div className={styles.formInput}>
                  <label htmlFor="hotel_files">
                    Image:{" "}
                    <DriveFolderUploadOutlinedIcon className="styles.icon" />
                  </label>
                  <input
                    type="file"
                    multiple
                    id="hotel_files"
                    onChange={(e) => handleFiles(e)}
                    style={{ display: "none" }}
                  />
                </div>

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
                  <label>Featured</label>
                  <select
                    value={selectedFeature}
                    onChange={(e) => setSelectedFeature(e.target.value)}
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>

                <div className={styles.formSelect}>
                  <label>Rooms</label>
                  <select multiple onChange={(e) => handleSelectRoom(e)}>
                    {loading ? (
                      "loading"
                    ) : data ? (
                      data.map((room, i) => (
                        <option value={room._id} key={i}>
                          {room.title}
                        </option>
                      ))
                    ) : (
                      <option disabled>There is no rooms to select</option>
                    )}
                  </select>
                </div>
              </div>

              <div className={styles.formFooter}>
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

export default NewHotel;
