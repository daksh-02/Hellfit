import React, { useEffect, useState } from "react";
import DayComponent from "../componets/DayComponent.jsx";
import WorkoutCard from "../componets/WorkoutCard.jsx";
import { useSelector } from "react-redux";
import { localHost } from "../constants";

const retrieveTrainingObj = async (trainingPlan) => {
  const res = await Promise.all(
    trainingPlan.map((id) =>
      fetch(`${localHost}/training/exercise/${id}`, {
        credentials: "include",
      }).then((response) => response.json())
    )
  );

  return res;
};

function WorkoutPage() {
  const workOutSplit = useSelector((state) => state.UserInfo.workOutSplit);
  const [trainingPlan, setTrainingPlan] = useState(new Map());
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    const getTrainingPlan = async () => {
      const plan = await retrieveTrainingObj(workOutSplit);
      const map = new Map();
      days.forEach((day) => map.set(day, []));

      plan.forEach((planObj) => map.get(planObj.day).push(planObj));
      setTrainingPlan(map);
    };

    getTrainingPlan();
  }, [workOutSplit]);

  const getCurrentDay = () => {
    const currentDayIndex = new Date().getDay(); // Sunday is 0, Monday is 1, and so on.
    return days[(currentDayIndex == 0?6:currentDayIndex-1)];
  };

  const currentDay = getCurrentDay();

  return (
    <>
      {days.map((day) => (
        <DayComponent key={day} day={day} isCurrentDay={day === currentDay}>
          {trainingPlan.get(day) && trainingPlan.get(day).length === 0 ? (
            <h2 className="text-white">Looks like its  your Rest day</h2>
          ) : (
            <div className="flex flex-wrap">
              {trainingPlan .get(day) ?.map((plan) =>
              <WorkoutCard key={plan._id} data={plan} isCurrentDay={day === currentDay}/>)}
            </div>
          )}
        </DayComponent>
      ))}
    </>
  );
}

export default WorkoutPage;
