import React from "react";
import useFetch from "../../hooks/useFetch";

import styles from "./FeaturedProperty.module.css";

export const FeaturedProperty = () => {
  const { data, loading, error } = useFetch(
    //"/api/hotels/find/byFeature?featured=true&limit=2&min=90&max=120"
    "/api/hotels/find/byFeature?featured=true"
  );

  const rating = [
    { name: "outstanding", num: "90-100" },
    { name: "excellent", num: "80-89" },
    { name: "very good", num: "70-79" },
    { name: "good", num: "60-69" },
    { name: "average", num: "50-59" },
    { name: "poor", num: "40-49" },
    { name: "bad", num: "0-39" },
  ];

  const sortRating = (rate, range) => {
    const [min, max] = range.split("-");
    if (rate * 10 >= min && rate * 10 <= max) {
      return true;
    }
  };

  const getRating = (rate) => {
    return rating.find((item) => sortRating(rate, item.num));
  };

  return (
    <div className={styles.feat_prop}>
      {loading
        ? "loading"
        : data.map((item, i) => (
            <div className={styles.feat_prop_item} key={item._id}>
              <img
                className={styles.feat_prop_img}
                src={item.photos[0]}
                alt={item.title}
              />
              <div className={styles.feat_prop_footer}>
                <p className={styles.feat_prop_name}>{item.name}</p>
                <p className={styles.feat_prop_city}>{item.city}</p>
                <p className={styles.feat_prop_price}>
                  Starting from £{item.cheapestPrice}
                </p>
                <div className={styles.feat_prop_rating}>
                  {item.rating ? (
                    <>
                      <button>{item.rating}</button>
                      <span>{getRating(item.rating).name}</span>
                    </>
                  ) : (
                    <>
                      <button>0</button>
                      <span>Not available</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};
