import React from "react";

import Hotels from "./../../img/List/Hotels.jpg";
import Apartments from "./../../img/List/Apartments.jpg";
import Resorts from "./../../img/List/Resorts.jpg";
import Villas from "./../../img/List/Villas.jpg";
import Cabins from "./../../img/List/Cabins.jpg";
import Cottages from "./../../img/List/Cottages.jpg";
import styles from "./PropertyList.module.css";

export const PropertyList = () => {
  return (
    <div className={styles.prop_list}>
      <div className={styles.prop_list_item}>
        <img className={styles.prop_list_img} src={Hotels} alt="Hotel" />
        <div className={styles.prop_list_footer}>
          <p className={styles.prop_title}>Hotels</p>
          <p className={styles.prop_desc}>233 hotels</p>
        </div>
      </div>
      <div className={styles.prop_list_item}>
        <img className={styles.prop_list_img} src={Resorts} alt="Resorts" />
        <div className={styles.prop_list_footer}>
          <p className={styles.prop_title}>Resorts</p>
          <p className={styles.prop_desc}>93 resorts</p>
        </div>
      </div>
      <div className={styles.prop_list_item}>
        <img
          className={styles.prop_list_img}
          src={Apartments}
          alt="Apartments"
        />
        <div className={styles.prop_list_footer}>
          <p className={styles.prop_title}>Apartments</p>
          <p className={styles.prop_desc}>203 apartments</p>
        </div>
      </div>
      <div className={styles.prop_list_item}>
        <img className={styles.prop_list_img} src={Villas} alt="Villas" />
        <div className={styles.prop_list_footer}>
          <p className={styles.prop_title}>Villas</p>
          <p className={styles.prop_desc}>154 villas</p>
        </div>
      </div>
      <div className={styles.prop_list_item}>
        <img className={styles.prop_list_img} src={Cabins} alt="Cabins" />
        <div className={styles.prop_list_footer}>
          <p className={styles.prop_title}>Cabins</p>
          <p className={styles.prop_desc}>63 cabins</p>
        </div>
      </div>
      <div className={styles.prop_list_item}>
        <img className={styles.prop_list_img} src={Cottages} alt="Cottages" />
        <div className={styles.prop_list_footer}>
          <p className={styles.prop_title}>Cottages</p>
          <p className={styles.prop_desc}>23 cottages</p>
        </div>
      </div>
    </div>
  );
};
