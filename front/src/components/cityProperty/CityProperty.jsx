import React from "react";

import useFetch from "../../hooks/useFetch";
import styles from "./CityProperty.module.css";

export const CityProperty = () => {
  const { data, loading, error } = useFetch("/api/hotels/count/byCity");

  return (
    <div className={styles.featured}>
      {loading
        ? "loading"
        : data.map((item, i) => (
            <div className={styles.featured_item} key={i}>
              <img
                src={item.photos[0]}
                alt={item._id}
                className={styles.featured_img}
              />
              <div className={styles.featured_footer}>
                <p className={styles.featured_title}>{item._id}</p>
                <p className={styles.featured_desc}>
                  {item.totalCity} properties
                </p>
              </div>
            </div>
          ))}
    </div>
  );
};
