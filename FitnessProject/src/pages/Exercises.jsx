import React, { useEffect, useRef } from "react";
import Carousel from "../componets/Corousel";
import Fetch from "../componets/Fetch";
import CarouselExcer from "../componets/CoroselExcer";
import Search from "../componets/Search";
import { useSelector } from "react-redux";

function Exercises() {
  const carouselExcerRef = useRef(null);
  const userData = useSelector((state) => state.Api?.userData);

  useEffect(() => {
    if (userData) {
      if (carouselExcerRef.current) {
        carouselExcerRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [userData]);

  return (
    <div className="max-w-[100%] ">
      <Search />
      <Carousel />
      <CarouselExcer ref={carouselExcerRef} />
      <Fetch />
    </div>
  );
}

export default Exercises;
