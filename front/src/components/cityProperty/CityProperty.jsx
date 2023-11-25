import React from "react";

import London from "./../../img/London.jpg";
import Chisinau from "./../../img/Chisinau.jpg";
import Norwich from "./../../img/Norwich.jpg";

import useFetch from "../../hooks/useFetch";
import styles from "./CityProperty.module.css";

export const CityProperty = () => {
  const { data, loading, error } = useFetch(
    "/api/hotels/count/byCity?cities=London,Chisinau,Norwich"
  );

  const cities = [
    { city: "London", img: London },
    { city: "Chisinau", img: Chisinau },
    { city: "Norwich", img: Norwich },
  ];

  return (
    <div className={styles.featured}>
      {loading
        ? "loading"
        : cities.map((item, i) => (
            <div className={styles.featured_item} key={i}>
              <img
                src={item.img}
                alt={item.city}
                className={styles.featured_img}
              />
              <div className={styles.featured_footer}>
                <p className={styles.featured_title}>{item.city}</p>
                <p className={styles.featured_desc}>{data[i]} properties</p>
              </div>
            </div>
          ))}
    </div>
  );
};
