import React, { useState } from "react";
import Styled from "styled-components";
import { Authenticate } from "../Goods";

const Aside = () => {
  let { handleFilterProduct } = Authenticate();

  let [activeBtn, setActiveBtn] = useState([
    { name: "all", value: true },
    { name: "cloths", value: false },
    { name: "watches", value: false },
    { name: "shoes", value: false },
    { name: "glasses", value: false },
    { name: "electronics", value: false },
  ]);

  // function to handle filtering product based on category and set active button
  const filterProduct = (e) => {
    let name = e.target.name;
    handleFilterProduct(name); // function from usecontext to handle  filtering

    //setting active button
    setActiveBtn((prev) => {
      return prev.map((btn) =>
        btn.name === name ? { ...btn, value: true } : { ...btn, value: false }
      );
    });
  };
  return (
    <AsideSection>
      <AsideHeader>Category</AsideHeader>
      <AsideBtn name="all" active={activeBtn[0].value} onClick={filterProduct}>
        All
      </AsideBtn>
      <AsideBtn
        name="cloths"
        active={activeBtn[1].value}
        onClick={filterProduct}
      >
        Cloths
      </AsideBtn>
      <AsideBtn
        name="watches"
        active={activeBtn[2].value}
        onClick={filterProduct}
      >
        Watches
      </AsideBtn>
      <AsideBtn
        name="shoes"
        active={activeBtn[3].value}
        onClick={filterProduct}
      >
        Shoes
      </AsideBtn>
      <AsideBtn
        name="glasses"
        active={activeBtn[4].value}
        onClick={filterProduct}
      >
        Glasses
      </AsideBtn>
      <AsideBtn
        name="electronics"
        active={activeBtn[5].value}
        onClick={filterProduct}
      >
        Electronics
      </AsideBtn>
    </AsideSection>
  );
};

export default Aside;

// style for ASIDE SECTION
const AsideSection = Styled.aside`
    position: sticky;
    width: 150px;
    top: 80px;
    left: 0;
    bottom: 0;
    height: 100%;
    padding: 5px;
    background-color: #fff;
`;

// style for ASIDE HEADER
const AsideHeader = Styled.h2`
    color: #555;
    margin: 15px 0;
    padding: 5px;
    font-family: ${({ theme }) => theme.montserratFont};
`;

// style for ASIDE BTN
const AsideBtn = Styled.button`
    color: rgb(0, 108, 151);
    font-size: 1.2rem;
    display: block;
    padding: 15px 10px;
    cursor: pointer;
    width: 100%;
    text-align: left;
    border: none;
    outline: none;
    background-color: transparent;
    border-top : 2px solid ${({ active }) => (active ? "orange" : "#e3e3e3")};
    border-bottom : 2px solid ${({ active }) =>
      active ? "orange" : "#e3e3e3"};
      &:hover{
        background-color: #eee;
      }
`;
