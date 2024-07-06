import React from "react";
import Slider from "react-slick";
import CarouselItem from "./CorouselItem";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: null, // Remove next arrow
    prevArrow: null, // Remove prev arrow
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


  const arr = [
    "All",
    "Back",
    "Cardio",
    "Chest",
    "Lower Arms",
    "Lower Legs",
    "Neck",
    "Shoulders",
    "Upper Arms",
    "Upper Legs",
    "Waist",
  ];

  return (
    <div className="my-4 max-w-[100%] ">
      <Slider {...settings} className="py-10">
        {arr.map((text, index) => (
          <CarouselItem key={index} text={text} />
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
