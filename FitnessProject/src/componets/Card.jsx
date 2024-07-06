import React from "react";
import { Link ,NavLink} from "react-router-dom";

function Card({ exc }) {
  return (
    <NavLink to = {`/Exercises/${exc.id}`}>
    <div className=" flex flex-col items-center justify-center m-4 border border-gray-300 bg-slate-50 relative overflow-hidden group transition duration-300 transform hover:-translate-y-2 hover:shadow-lg w-72 h-96 p-4">
      <div className="h-4/5 w-full p-4 flex items-center justify-center">
        <img
          src={exc.gifUrl}
          alt="Item"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex gap-2 justify-center mt-4">
        <button className="bg-[#f78dbb] px-4 py-2 rounded-2xl font-medium text-white first-letter:uppercase">
          {exc.bodyPart}
        </button>
        <button className="bg-[#FDC757] px-4 py-2 rounded-2xl font-medium text-white first-letter:uppercase">
          {exc.target}
        </button>
      </div>

      <p className="text-lg mt-4">{exc.name}</p>
    </div>
    </NavLink>
  );
}

export default Card;
