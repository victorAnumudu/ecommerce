import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Styled from "styled-components";

//components
import SlideTextOverlay from "./shared/SlideTextOverlay";

// hero images
import slide1 from "../assets/hero/slide1.jpg";
import slide2 from "../assets/hero/slide2.jpg";
import slide3 from "../assets/hero/slide3.jpg";
import slide4 from "../assets/hero/slide4.jpg";
import hero1 from "../assets/hero/hero1.jpg";
import hero2 from "../assets/hero/hero2.jpg";
import hero3 from "../assets/hero/hero3.jpg";
import hero4 from "../assets/hero/electronics1.jpg";

const Hero = () => {
  // slide show effects
  // let [slideCounter, setSlideCounter] = useState(0);
  useEffect(() => {
    let slideCounter = 0;
    let slide = () => {
      let imgs = document.querySelectorAll(".slide");
      for (let i = 0; i < imgs.length; i++) {
        if (i === slideCounter) {
          imgs[i].style.zIndex = 1;
        } else {
          imgs[i].style.zIndex = 0;
        }
      }
      if (slideCounter === imgs.length - 1) {
        // setSlideCounter(0);
        slideCounter = 0;
      } else {
        // setSlideCounter(() => {
        //   return slideCounter + 1;
        // });
        slideCounter += 1;
      }
    };
    let show = setInterval(slide, 4000);
    return () => {
      clearInterval(show);
    };
  }, []); // slideCounter as dependency array

  return (
    <HeroWrapper>
      <HeroSlide>
        <HeroTextWrapper>
          <HeroText>Your One Time Shopping Solution</HeroText>
          <Link to="/login">
            SHOP NOW <i className="fa-solid fa-cart-shopping"></i>
          </Link>
        </HeroTextWrapper>
        <SlideImg className="slide" src={slide1} alt="slide image" />
        <SlideImg className="slide" src={slide2} alt="slide image" />
        <SlideImg className="slide" src={slide3} alt="slide image" />
        <SlideImg className="slide" src={slide4} alt="slide image" />
      </HeroSlide>

      <HeroLeft>
        <HeroLeftImgContainer>
          <SlideTextOverlay text="Hello" />
          <HeroLeftImg src={hero1} alt="image" />
        </HeroLeftImgContainer>
        <HeroLeftImgContainer>
          <SlideTextOverlay text="Hello" />
          <HeroLeftImg src={hero2} alt="image" />
        </HeroLeftImgContainer>
        <HeroLeftImgContainer>
          <SlideTextOverlay text="Hello" />
          <HeroLeftImg src={hero3} alt="image" />
        </HeroLeftImgContainer>
        <HeroLeftImgContainer>
          <SlideTextOverlay text="Hello" />
          <HeroLeftImg src={hero4} alt="image" />
        </HeroLeftImgContainer>
      </HeroLeft>
    </HeroWrapper>
  );
};

export default Hero;

//style for hero section wrapper
const HeroWrapper = Styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  // margin-top: 60px;
  // background-color: brown;
  @media screen and (max-width: 991px){
    &{
        display: block;
    }
  }
`;

//style for hero section slide screen
const HeroSlide = Styled.div`
  height: inherit;
  position: relative;
  background-color: purple;
  flex-basis: 60%;
  height: 600px;
  @media screen and (max-width: 568px){
    &{
        height: 300px;
    }
  }
`;

const SlideImg = Styled.img`
position: absolute;
// right: -100%;
height: inherit;
`;

//hero text detail wrapper
const HeroTextWrapper = Styled.div`
color: #fff;
position: absolute;
z-index: 2;
width: 100%;
top:50%;
left:50%;
text-align: center;
transform: translate(-50%, -50%);
& a {
    text-decoration: none;
    color: #fff;
    background-color: orange;
    display:inline-block;
    padding: 10px;
    border-radius: 10px;
    font-size: 2rem;
    font-weight: 700;
}
& a:hover {
    background-color: rgb(207, 136, 5)
}
`;

//hero text
const HeroText = Styled.h1`
color: #fff;
font-size: 3.5rem;
text-align: center;
text-shadow: 0px 0px 10px #000;
margin-bottom: 5px;
@media screen and (max-width: 568px){
    &{
        font-size: 2rem;
    }
  }
`;

//style for hero section left
const HeroLeft = Styled.div`
display: flex;
flex-wrap: wrap;
height: inherit;
flex-basis: 40%;
`;

// left image wrapper
const HeroLeftImgContainer = Styled.div`
position: relative;
z-index: 1;
overflow: hidden;
width: 50%;
padding: 1px;
height: 300px;
@media screen and (max-width: 568px){
    &{
        height: 200px;
    }
  }

  &:hover div{
    // left: 0;
    width: 100%;
    height: 100%;
    animation-iteration-count: 0;
  }
`;

//style for hero section left
const HeroLeftImg = Styled.img`
height: 100%;
`;
