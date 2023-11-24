import React from "react";

import { Navbar } from "../../components/navbar/Navbar";
import { Header } from "../../components/header/Header";
import { Featured } from "../../components/feaured/Featured";
import { PropertyList } from "../../components/property/PropertyList";
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
        <Featured />
        <h2 className={styles.home_title}>Browse by property type</h2>
        <PropertyList />
        <h2 className={styles.home_title}>Home guests love</h2>
        <FeaturedProperty />
        <Subscribe />
        <Footer />
      </div>
    </div>
  );
};
