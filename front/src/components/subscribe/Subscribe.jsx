import React from "react";

import styles from "./Subscribe.module.css";

export const Subscribe = () => {
  return (
    <div className={styles.subscribe}>
      <h1 className={styles.subscribe_title}>Save time, save money!</h1>
      <p className={styles.subscribe_desc}>
        Sign up and we'll send the best deals to you
      </p>
      <div className={styles.subscribe_input_container}>
        <input type="text" placeholder="Your Email" />
        <button>Subscribe</button>
      </div>
    </div>
  );
};
