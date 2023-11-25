import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button, Box, Modal } from "@mui/material";

import { Navbar } from "../../components/navbar/Navbar";
import { Header } from "../../components/header/Header";
import { Subscribe } from "../../components/subscribe/Subscribe";
import { Footer } from "../../components/footer/Footer";
import { Reserve } from "../../components/reserve/Reserve";
import CoolLightBox from "../../components/lightBox/CoolLightBox";

import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Hotel.module.css";

export const Hotel = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { startDateOption, endDateOption, personOption } =
    React.useContext(SearchContext);
  const { user } = React.useContext(AuthContext);

  const { data, loading, error } = useFetch(`/api/hotels/${id}`);

  const [currentImageIndex, setCurrentIndex] = React.useState(0);
  const [isOpenLightbox, setIsOpenLightbox] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const imageClickHandler = (index) => {
    setCurrentIndex(index);
    setIsOpenLightbox(!isOpenLightbox);
  };

  const dayCounter = (start, end) => {
    let startUnix = start
      .set("hour", 0)
      .set("minute", 0)
      .set("second", 0)
      .unix();

    let endUnix = end
      .set("hour", 23)
      .set("minute", 59)
      .set("second", 59)
      .unix();

    let diff = endUnix - startUnix + 1;

    return Math.floor(diff / (24 * 60 * 60));
  };

  const handleClick = () => {
    if (user) {
      setOpen(true);
    } else {
      navigate("/login");
    }
  };

  const photosTransform = (arr) => {
    return arr.map((item, i) => {
      return { src: item, alt: "Hotel image" };
    });
  };

  return (
    <div>
      <Navbar />
      <Header type="custom" />
      {loading ? (
        "loading"
      ) : (
        <div className={styles.hotel_container}>
          <div className={styles.hotel_header}>
            <div className={styles.header_desc}>
              <h2 className={styles.header_title}>{data.name}</h2>
              <div className={styles.header_address}>
                <LocationOnIcon
                  sx={{
                    fontSize: "16px",
                  }}
                />
                <p>{data.address}</p>
              </div>
              <p className={styles.header_amenity}>
                Excellent location - {data.distance}m fron center
              </p>
              <p className={styles.header_offer}>
                Book a stay over £{data.cheapestPrice} at this property and get
                a free airport taxi
              </p>
            </div>
            <Button
              onClick={handleClick}
              variant="contained"
              sx={{
                alignSelf: "start",
                textTransform: "none",
              }}
            >
              Reserve or Book Now!
            </Button>
          </div>
          <div className={styles.hotel_body}>
            {data.photos.map((item, i) => {
              return (
                <img
                  key={i}
                  src={item}
                  alt="Hotel image"
                  onClick={() => imageClickHandler(i)}
                />
              );
            })}
            <CoolLightBox
              photos={photosTransform(data.photos)}
              currentImageIndex={currentImageIndex}
              isOpenLightbox={isOpenLightbox}
              setCurrentIndex={setCurrentIndex}
              setIsOpenLightbox={setIsOpenLightbox}
              onClose={() => setIsOpenLightbox(false)}
            />
          </div>
          <div className={styles.hotel_footer}>
            <div className={styles.footer_desc}>
              <p>{data.desc}</p>
            </div>
            <div className={styles.footer_offer}>
              <h3>
                Perfect for a {dayCounter(startDateOption, endDateOption)}-night
                stay!
              </h3>
              <p>
                <b>
                  £
                  {dayCounter(startDateOption, endDateOption) *
                    data.cheapestPrice *
                    personOption.room}
                </b>{" "}
                ({dayCounter(startDateOption, endDateOption)} nights)
              </p>
              <Button
                onClick={handleClick}
                variant="contained"
                sx={{
                  textTransform: "none",
                  width: "100%",
                }}
              >
                Reserve or Book Now!
              </Button>
            </div>
          </div>
        </div>
      )}
      {open && <Reserve open={open} setOpen={setOpen} hotelId={id} />}
      <Subscribe />
      <Footer />
    </div>
  );
};
