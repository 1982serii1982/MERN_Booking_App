import React from "react";

import useFetch from "../../hooks/useFetch";

import Hotels from "./../../img/List/Hotels.jpg";
import Resorts from "./../../img/List/Resorts.jpg";
import Apartments from "./../../img/List/Apartments.jpg";
import Villas from "./../../img/List/Villas.jpg";
import Cabins from "./../../img/List/Cabins.jpg";
import Cottages from "./../../img/List/Cottages.jpg";

import styles from "./TypeProperty.module.css";

export const TypeProperty = () => {
  const { data, loading, error } = useFetch("/api/hotels/count/byType");

  const propType = {
    hotel: Hotels,
    resort: Resorts,
    apartment: Apartments,
    villa: Villas,
    cabin: Cabins,
    cottage: Cottages,
  };

  return (
    <div className={styles.prop_list}>
      {loading
        ? "loading"
        : data.map((item, i) => (
            <div className={styles.prop_list_item} key={i}>
              <img
                className={styles.prop_list_img}
                src={propType[item.type]}
                alt={item.type}
              />
              <div className={styles.prop_list_footer}>
                <p className={styles.prop_title}>{item.type}</p>
                <p className={styles.prop_desc}>
                  {item.count} {item.type}s
                </p>
              </div>
            </div>
          ))}
    </div>
  );
};
