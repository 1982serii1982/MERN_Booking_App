import React from "react";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button } from "@mui/material";

import { Navbar } from "../../components/navbar/Navbar";
import { Header } from "../../components/header/Header";
import { Subscribe } from "../../components/subscribe/Subscribe";
import { Footer } from "../../components/footer/Footer";
import CoolLightBox from "../../components/lightBox/CoolLightBox";

import test from "./../../img/List/Apartments.jpg";

import styles from "./Hotel.module.css";

export const Hotel = () => {
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

  const imageClickHandler = (index) => {
    setCurrentIndex(index);
    setIsOpenLightbox(!isOpenLightbox);
  };

  return (
    <div>
      <Navbar />
      <Header type="custom" />
      <div className={styles.hotel_container}>
        <div className={styles.hotel_header}>
          <div className={styles.header_desc}>
            <h2 className={styles.header_title}>Tower Street Apartments</h2>
            <div className={styles.header_address}>
              <LocationOnIcon
                sx={{
                  fontSize: "16px",
                }}
              />
              <p>50 Russel Street, Norwich, Norfolk, UK, NR2 4QT</p>
            </div>
            <p className={styles.header_amenity}>
              Excellent location - 500m fron center
            </p>
            <p className={styles.header_offer}>
              Book a stay over £115 at this property and get a free airport taxi
            </p>
          </div>
          <Button
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
            photos={photos}
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
              free WiFi. The units come with hardwood floors and feature a fully
              equipped kitchenette with a microwave, a flat-screen TV, and a
              private bathroom with shower and a hairdryer. A fridge is also
              offered, as well as an electric tea pot and a coffee machine.
              Popular points of interest near the apartment include Cloth Hall,
              Main Market Square and Town Hall Tower. The nearest airport is
              John Paul II International Kraków–Balice, 16.1 km from Tower
              Street Apartments, and the property offers a paid airport shuttle
              service.
            </p>
          </div>
          <div className={styles.footer_offer}>
            <h3>Perfect for a 9-night stay!</h3>
            <p>
              Located in the real heart of Krakow, this property has an
              excellent location score of 9.8!
            </p>
            <p>
              <b>$945</b> (9 nights)
            </p>
            <Button
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
      <Subscribe />
      <Footer />
    </div>
  );
};
