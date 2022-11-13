import Styled from "styled-components";

import React from "react";
import { Link } from "react-router-dom";

const SlideTextOverlay = ({ text }) => {
  return (
    <Overlay>
      {/* <Link>Click to Buy</Link> */}
    </Overlay>
  );
};

export default SlideTextOverlay;

//style for text overlay

// const Overlay = Styled.div`
//     position: absolute;
//     width: 100%;
//     top: 0;
//     left: -100%;
//     background-color: rgba(255, 255, 255, .5);
//     bottom: 0;
//     padding: 5px;
//     transition: left .2s;
// `;

const Overlay = Styled.div`
display: flex;
align-items: center;
justify-content: center;
    position: absolute;
    width: 0%;
    height: 0%;
    overflow: hidden;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // bottom: 0;
    background-color: rgba(255, 255, 255, .3);
    padding: 1px;
    // transition: all .2s;

    animation: overlay;
    animation-timing-function: linear;
    animation-duration: 3s;
    animation-iteration-count: infinite;

    @keyframes  overlay {
      0%{
        width: 0%;
        height: 0%;
      }
      50%{
        width: 80%;
        height: 80%;
      }
      100%{
        width: 0%;
        height: 0%;
      }
    }
`;


