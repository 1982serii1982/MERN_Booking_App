import React from "react";

import Brooklyn from "./../../img/Brooklyn.jpg";
import Sydney from "./../../img/Sydney.jpg";
import Tokyo from "./../../img/Tokyo.jpg";

import styles from "./Featured.module.css";

export const Featured = () => {
  return (
    <div className={styles.featured}>
      <div className={styles.featured_item}>
        <img src={Brooklyn} alt="Brooklyn" className={styles.featured_img} />
        <div className={styles.featured_footer}>
          <p className={styles.featured_title}>Brooklyn</p>
          <p className={styles.featured_desc}>123</p>
        </div>
      </div>
      <div className={styles.featured_item}>
        <img src={Sydney} alt="Sydney" className={styles.featured_img} />
        <div className={styles.featured_footer}>
          <p className={styles.featured_title}>Sydney</p>
          <p className={styles.featured_desc}>123</p>
        </div>
      </div>
      <div className={styles.featured_item}>
        <img src={Tokyo} alt="Tokyo" className={styles.featured_img} />
        <div className={styles.featured_footer}>
          <p className={styles.featured_title}>Tokyo</p>
          <p className={styles.featured_desc}>123</p>
        </div>
      </div>
    </div>
  );
};
