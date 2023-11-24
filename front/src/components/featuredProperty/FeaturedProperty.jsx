import React from "react";

import Appartment_1 from "./../../img/Featured/ap_1.jpg";
import Appartment_2 from "./../../img/Featured/ap_2.jpg";
import Appartment_3 from "./../../img/Featured/ap_3.jpg";
import Appartment_4 from "./../../img/Featured/ap_4.jpg";
import styles from "./FeaturedProperty.module.css";

export const FeaturedProperty = () => {
  return (
    <div className={styles.feat_prop}>
      <div className={styles.feat_prop_item}>
        <img
          className={styles.feat_prop_img}
          src={Appartment_1}
          alt="Appartment_1"
        />
        <div className={styles.feat_prop_footer}>
          <p className={styles.feat_prop_name}>Starlight Paradise Suites</p>
          <p className={styles.feat_prop_city}>Madrid</p>
          <p className={styles.feat_prop_price}>Starting from £120</p>
          <div className={styles.feat_prop_rating}>
            <button>8.9</button>
            <span>Excellent</span>
          </div>
        </div>
      </div>
      <div className={styles.feat_prop_item}>
        <img
          className={styles.feat_prop_img}
          src={Appartment_2}
          alt="Appartment_2"
        />
        <div className={styles.feat_prop_footer}>
          <p className={styles.feat_prop_name}>Grandview Palaces</p>
          <p className={styles.feat_prop_city}>Tokyo</p>
          <p className={styles.feat_prop_price}>Starting from £160</p>
          <div className={styles.feat_prop_rating}>
            <button>7.6</button>
            <span>Good</span>
          </div>
        </div>
      </div>
      <div className={styles.feat_prop_item}>
        <img
          className={styles.feat_prop_img}
          src={Appartment_3}
          alt="Appartment_3"
        />
        <div className={styles.feat_prop_footer}>
          <p className={styles.feat_prop_name}>Lush Poolside Bungalows</p>
          <p className={styles.feat_prop_city}>London</p>
          <p className={styles.feat_prop_price}>Starting from £220</p>
          <div className={styles.feat_prop_rating}>
            <button>8.0</button>
            <span>Excellent</span>
          </div>
        </div>
      </div>
      <div className={styles.feat_prop_item}>
        <img
          className={styles.feat_prop_img}
          src={Appartment_4}
          alt="Appartment_4"
        />
        <div className={styles.feat_prop_footer}>
          <p className={styles.feat_prop_name}>Starlight Oceanside Retreats</p>
          <p className={styles.feat_prop_city}>Paris</p>
          <p className={styles.feat_prop_price}>Starting from £130</p>
          <div className={styles.feat_prop_rating}>
            <button>9.0</button>
            <span>Excellent</span>
          </div>
        </div>
      </div>
    </div>
  );
};
