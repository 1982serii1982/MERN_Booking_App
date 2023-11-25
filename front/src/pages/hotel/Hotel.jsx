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

import test from "./../../img/List/Apartments.jpg";

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

  const photos = [
    {
      src: test,
      alt: "test1",
    },
    {
      src: test,
      alt: "test2",
    },
    {
      src: test,
      alt: "test3",
    },
    {
      src: test,
      alt: "test4",
    },
    {
      src: test,
      alt: "test5",
    },
    {
      src: test,
      alt: "test6",
    },
  ];

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
            {photos.map((item, i) => {
              //mai tarziu va fi schimbata cu data.photos
              return (
                <img
                  key={i}
                  src={item.src}
                  alt={item.alt}
                  onClick={() => imageClickHandler(i)}
                />
              );
            })}
            <CoolLightBox
              photos={photos} //mai tarziu va fi schimbata cu data.photos
              currentImageIndex={currentImageIndex}
              isOpenLightbox={isOpenLightbox}
              setCurrentIndex={setCurrentIndex}
              setIsOpenLightbox={setIsOpenLightbox}
              onClose={() => setIsOpenLightbox(false)}
            />
          </div>
          <div className={styles.hotel_footer}>
            <div className={styles.footer_desc}>
              <h2>Stay in the heart of Norwich</h2>
              <p>
                Located a 5-minute walk from St. Florian's Gate in Krakow, Tower
                Street Apartments has accommodations with air conditioning and
                free WiFi. The units come with hardwood floors and feature a
                fully equipped kitchenette with a microwave, a flat-screen TV,
                and a private bathroom with shower and a hairdryer. A fridge is
                also offered, as well as an electric tea pot and a coffee
                machine. Popular points of interest near the apartment include
                Cloth Hall, Main Market Square and Town Hall Tower. The nearest
                airport is John Paul II International Kraków–Balice, 16.1 km
                from Tower Street Apartments, and the property offers a paid
                airport shuttle service.
              </p>
            </div>
            <div className={styles.footer_offer}>
              <h3>
                Perfect for a {dayCounter(startDateOption, endDateOption)}-night
                stay!
              </h3>
              <p>
                Located in the real heart of Krakow, this property has an
                excellent location score of {data.rating}!
              </p>
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
