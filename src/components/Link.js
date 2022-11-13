import React from "react";
import { Link } from "react-router-dom";

import Styled from "styled-components";

const AnchorLink = () => {
  return (
    <LinkWrapper>
      <Link to="/">Back to Home</Link>
    </LinkWrapper>
  );
};

export default AnchorLink;

const LinkWrapper = Styled.div`
position: sticky;
top: 60px;
z-index: 1;
& a{
    display: block;
    text-decoration: none;
    color: orange;
    padding: 10px 0;
    font-size: 18px;
    padding: 10px;
    font-weight: 900;
    background-color: #e3e3e3;
}
`;
