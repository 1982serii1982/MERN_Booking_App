import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

import styles from "./SearchResult.module.css";
import test from "./../../img/List/Cottages.jpg";

import { SearchContext } from "../../context/SearchContext";

export const SearchResult = ({ item }) => {
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

  const navigate = useNavigate();

  const buttonHandler = () => {
    navigate(`/hotels/${item._id}`);
  };

  return (
    <div className={styles.search_result_item}>
      <img src={item.photos[0]} alt={item.title} title={item.title} />
      <div className={styles.search_result_desc}>
        <h3 className={styles.desc_title}>{item.name}</h3>
        <p className={styles.desc_distance}>{item.distance}m from center</p>
        <p className={styles.desc_taxi}>Free airport taxi</p>
        <p className={styles.desc_feature_1}>
          Studio Apartment with Air conditioning
        </p>
        <p className={styles.desc_feature_2}>
          {/* Entire studio &bull; 1 bathroom &bull; 21m<sup>2</sup> 1 full bed */}
          {item.desc}
        </p>
        <p className={styles.desc_policy_1}>Free cancellation</p>
        <p className={styles.desc_policy_2}>
          You can cancel later, so lock in this great price today
        </p>
      </div>
      <div className={styles.search_result_details}>
        <div className={styles.search_result_rating}>
          {item.rating ? (
            <>
              <span>{getRating(item.rating).name}</span>
              <button>{item.rating}</button>
            </>
          ) : (
            <>
              <span>Not available</span>
              <button>0</button>
            </>
          )}
        </div>
        <div className={styles.search_result_price}>
          <span>£{item.cheapestPrice}</span>
          <span>Includes taxes and fees</span>
          <Button
            onClick={buttonHandler}
            variant="contained"
            color="primary"
            sx={{
              textTransform: "none",
            }}
          >
            See availability
          </Button>
        </div>
      </div>
    </div>
  );
};
