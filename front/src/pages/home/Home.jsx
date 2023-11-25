import React from "react";

import { Navbar } from "../../components/navbar/Navbar";
import { Header } from "../../components/header/Header";
import { CityProperty } from "../../components/cityProperty/CityProperty";
import { TypeProperty } from "../../components/typeProperty/TypeProperty";
import { FeaturedProperty } from "../../components/featuredProperty/FeaturedProperty";
import { Subscribe } from "../../components/subscribe/Subscribe";
import { Footer } from "../../components/footer/Footer";

import styles from "./Home.module.css";

export const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className={styles.home_main}>
        <CityProperty />
        <h2 className={styles.home_title}>Browse by property type</h2>
        <TypeProperty />
        <h2 className={styles.home_title}>Home guests love</h2>
        <FeaturedProperty />
        <Subscribe />
        <Footer />
      </div>
    </div>
  );
};
