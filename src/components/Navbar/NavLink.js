import React from "react";

import { Link } from "react-router-dom";
import Styled from "styled-components"; //style module importation

const NavLink = (props) => {
  const { path, name, active, onclick } = props;
  return (
    <Anchor active={active}>
      <Link to={path} name={name} onClick={onclick}>
        {name}
      </Link>
    </Anchor>
  );
};

export default NavLink;

// style for NavLink
const Anchor = Styled.div`
 & a{
    color: ${({ active }) => (active ? "orange" : "#fff")};
    text-decoration: none;
    font-size: 1.2rem;
    display: block;
    padding: 5px;
    margin: 0 20px;
    position: relative;
 }
 @media screen and (max-width:768px) {
    & a{
        margin: 5px 0px;
        padding: 5px 0px;
        color: ${({ active }) => (active ? "orange" : "#fff")};
    }
  }
 & a::after{
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%;
    height: 2px;
    background-color: ${({ active }) => (active ? "orange" : "#fff")};
    transition: width .2s
 }
 & a:hover::after{
    width: 100%;
 }
`;
