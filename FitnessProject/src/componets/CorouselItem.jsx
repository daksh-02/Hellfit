import React from "react";
import gymimg from "../images/gym.png";
import { useDispatch } from "react-redux";
import { updateSearch } from "../store/APISlice";

function CarouselItem({ text }) {
  const dispatch = useDispatch();

  function handleButtonClick(text) {
    let result = [];
    if (text !== "All") {
      text = text.replace(/ /g, "%20").toLowerCase();
      result = ["bodyPart", text];
    }
    dispatch(updateSearch(result));
  }

  return (
    <button
      className="flex flex-col items-center justify-center m-4 border border-gray-300 bg-slate-50 relative overflow-hidden group transition duration-300 transform hover:-translate-y-2 hover:shadow-lg
               w-60 h-60 p-4" // Adjust width, height, and padding
      onClick={() => handleButtonClick(text)}
    >
      <div className="h-24 w-24 p-4">
        {/* Adjust the size of the image container */}
        <img src={gymimg} alt="Item" className="small-image-style" />
      </div>

      <p className="text-2xl p-4">{text}</p>
    </button>
  );
}

export default CarouselItem;
