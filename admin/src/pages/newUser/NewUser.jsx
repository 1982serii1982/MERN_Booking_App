import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { md5 } from "js-md5";
import axiosM from "./../../utils/axiosM";

import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import { imageDB } from "../../utils/configFireBase";
import "./newUser.scss";

const NewUser = ({ inputs, title }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [checked, setChecked] = useState(false);

  const handleBack = (e) => {
    e.preventDefault();
    navigate("/users");
  };

  const handleInput = (e) => {
    setUserInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCheckBox = () => {
    setChecked(!checked);
  };

  const handleSubmit = async (e) => {
    const infoToSend = { ...userInfo };

    e.preventDefault();

    const imgRef = ref(
      imageDB,
      `booking_app_images/users/${md5(userInfo.email)}/${md5(userInfo.email)}`
    );

    //const imgRef = ref(imageDB, `booking_app_images/users/${v4()}`); //creaza o referenta catre fisierul din firebase (firestore) cu care dorim sa operam
    //acolo in store noi vom pastra fisierele uploadate sub alt nume (pentru a nu crea colizii de nume de fisiere, pentru asta raspunde
    //functia v4() din modulul uuid, care da nume unic)

    const item = await uploadBytes(imgRef, file); //uploadeaza efectiv fisierul spre firebase

    //const { items } = await listAll(
    //  ref(imageDB, `booking_app_images/users/${md5(userInfo.email)}`)
    //); //listeaza fisierele (mai precis referintele catre fisiere) care sint in firebase
    //in directoriul 'booking_app_images'

    const url = await getDownloadURL(item.ref);

    infoToSend.img = url;

    // for (const ref of items) {
    //   console.log(ref.name);
    //   //obtine URL imaginii din firestore ca sa o folosim pe urma
    //   const url = await getDownloadURL(ref);
    //   infoToSend.img = url;
    // }

    infoToSend.isAdmin = checked;

    const res = await axiosM.post("/api/auth/register", infoToSend);
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input, i) => (
                <div className="formInput" key={i}>
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

              <div className="formInput">
                <label>Admin</label>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={handleCheckBox}
                />
              </div>

              <div className="buttons">
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

export default NewUser;
