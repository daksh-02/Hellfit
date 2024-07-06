import React from "react";
import ronny from "../images/ronny.png"
import { useNavigate } from "react-router-dom";

function Home() {
  const imagePath = "../ronny.png";
  const navigate = useNavigate();

  const handleSumit = () =>{
    navigate('/Exercises');
  }
  return (
    <div className="max-w-[100%] ">
      <div className="flex">
        <div className="w-7/12 bg-zinc-100 p-4">
          <div className="flex flex-col justify-center place-items-start h-screen">
            <div className="flex-item text-3xl p-4 text-[#FF2625] font-semibold">
              <p>Fitness Club</p>
            </div>
            <div className="flex-item text-5xl p-4 font-bold">
              <p>Sweat, Smile And Repeat</p>
            </div>
            <div className="flex-item text-2xl p-4">
              <p>
                Check out the most effective exercises personalized to you
              </p>
            </div>

            <div className="flex-item text-3xl p-3">
              
              <button className="bg-[#FF2625] text-white border-2 p-4 font-semibold" onClick={handleSumit}>
                Explore Exercises
              </button>
     
            </div>
          </div>
        </div>
        <div className="w-5/12 bg-slate-100 ">
          <img src={ronny} alt="" className="w-full h-full object-fill" />
        </div>
      </div>
    </div>
  );
}

export default Home;
