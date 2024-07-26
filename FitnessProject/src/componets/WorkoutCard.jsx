import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setWorkOutCompletedCount, setWorkOutSplit } from "../store/UserSlice";
import { localHost } from "../constants";

const WorkoutCard = ({ data, isCurrentDay }) => {
  const [isChecked, setIsChecked] = useState(false);
  let workOutCompletedCount = useSelector(
    (state) => state.UserInfo.workOutCompletedCount
  );
  const dispatch = useDispatch();

  const handleCheckboxChange = (event) => {
    event.stopPropagation();
    setIsChecked(!isChecked);
    let currentDayIndex = new Date().getDay();
    currentDayIndex = currentDayIndex === 0 ? 6 : currentDayIndex - 1;
    const updatedWorkOutCompletedCount = [...workOutCompletedCount];
    updatedWorkOutCompletedCount[currentDayIndex] += isChecked ? -1 : 1;
    dispatch(setWorkOutCompletedCount(updatedWorkOutCompletedCount));
  };

  const handleMinusClick = async () => {
    event.stopPropagation();
    try {
      const response = await fetch(
        `${localHost}/training/exercise/${data._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const res = await response.json();
      dispatch(setWorkOutSplit(res.data.workOutSplit));
      alert(res.message);
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="relative bg-white shadow-md rounded-lg overflow-hidden w-32 m-2 border border-gray-200">
      <div className="relative">
        <Link
          to={`/Exercises/${data.exerciseID}`}
          className="block hover:no-underline focus:no-underline"
        >
          <img
            src={data.exerciseIMG}
            alt={data.name}
            className="w-full h-32 object-cover"
          />
        </Link>
        <div className="absolute top-2 right-2">
          <button
            onClick={handleMinusClick}
            className="w-4 h-4 bg-red-500 text-white text-lg font-bold flex items-center justify-center rounded"
            style={{ lineHeight: "0.875rem" }} // Adjust line-height for better vertical centering
          >
            -
          </button>
        </div>
        {isCurrentDay ? (
          <div className="absolute top-2 left-2 flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className={`form-checkbox h-4 w-4 text-blue-600 ${
                isChecked ? "bg-blue-600" : ""
              }`}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default WorkoutCard;
