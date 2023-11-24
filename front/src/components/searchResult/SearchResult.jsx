import React from "react";

import Button from "@mui/material/Button";

import styles from "./SearchResult.module.css";
import test from "./../../img/List/Cottages.jpg";

export const SearchResult = () => {
  return (
    <div className={styles.search_result_item}>
      <img src={test} alt="" />
      <div className={styles.search_result_desc}>
        <h3 className={styles.desc_title}>Tower Street Apartments</h3>
        <p className={styles.desc_distance}>500m from center</p>
        <p className={styles.desc_taxi}>Free airport taxi</p>
        <p className={styles.desc_feature_1}>
          Studio Apartment with Air conditioning
        </p>
        <p className={styles.desc_feature_2}>
          Entire studio &bull; 1 bathroom &bull; 21m<sup>2</sup> 1 full bed
        </p>
        <p className={styles.desc_policy_1}>Free cancellation</p>
        <p className={styles.desc_policy_2}>
          You can cancel later, so lock in this great price today
        </p>
      </div>
      <div className={styles.search_result_details}>
        <div className={styles.search_result_rating}>
          <span>Good</span>
          <button>7.6</button>
        </div>
        <div className={styles.search_result_price}>
          <span>£112</span>
          <span>Includes taxes and fees</span>
          <Button
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
