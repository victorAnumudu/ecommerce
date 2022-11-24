import React from "react";

//component importation
import Hero from "../components/Hero";
import Main from "../components/Main";
import Aside from "../components/Aside";
import Products from "../components/Products";

const Home = () => {
  return (
    <>
      <Hero />
      <Main>
        <Aside />
        <Products />
      </Main>
    </>
  );
};

export default Home;
