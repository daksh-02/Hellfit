import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import part from "../images/body-part.png";
import target from "../images/target.png";
import equipment from "../images/equipment.png";
import Card from "../componets/Card";
import Button from "../componets/Button.jsx";
import Pagination from "@mui/material/Pagination";
import { Box, Stack, TextField, Typography } from "@mui/material";
import Select from "../componets/Select.jsx";
import CustomModal from "../componets/Modal.jsx";
import { localHost } from "../constants.js";
import { useSelector, useDispatch } from "react-redux";
import { setWorkOutSplit } from "../store/UserSlice.js";

const ExerciseDetail = () => {
  const { id } = useParams();
  const [exc, setExc] = useState(null);
  const [targetExc, setTargetExc] = useState(null);
  const [equipmentExc, setEquipmentExc] = useState(null);
  const [currentTarPage, setCurrentTarPage] = useState(1);
  const [currentEquPage, setCurrentEquPage] = useState(1);
  const selectRef = useRef(null);
  const isLoggedIn = useSelector((state) => state.UserInfo.isLoggedIn);
  const dispatch = useDispatch();

  const exePerPage = 3;

  const indexOfLastExerciseTar = currentTarPage * exePerPage;
  const indexOfFirstExerciseTar = indexOfLastExerciseTar - exePerPage;
  const currentTarExc =
    targetExc &&
    targetExc.slice(indexOfFirstExerciseTar, indexOfLastExerciseTar);

  const indexOfLastExerciseEqu = currentEquPage * exePerPage;
  const indexOfFirstExerciseEqu = indexOfLastExerciseEqu - exePerPage;
  const currentEquipmentExc =
    equipmentExc &&
    equipmentExc.slice(indexOfFirstExerciseEqu, indexOfLastExerciseEqu);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const exercise = await getExerciseByID(id);
        setExc(exercise);
      } catch (error) {
        console.error(error);
      }
      setCurrentTarPage(1);
      setCurrentEquPage(1);
    };

    fetchExercise();
  }, [id]);

  useEffect(() => {
    const fetchExerciseByTarget = async () => {
      try {
        const exercise = await getExerciseByBodyPart(exc.target);
        setTargetExc(exercise);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchExerciseByEquipment = async () => {
      try {
        const exercise = await getExerciseByEquipment(exc.equipment);
        setEquipmentExc(exercise);
      } catch (error) {
        console.error(error);
      }
    };

    if (exc) {
      fetchExerciseByEquipment();
      fetchExerciseByTarget();
    }
  }, [exc]);

  useEffect(() => {
    // Scroll to top when the `id` changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const paginateTar = (event, value) => {
    setCurrentTarPage(value);
  };

  const paginateEqu = (event, value) => {
    setCurrentEquPage(value);
  };

  const options = [
    "--NONE--",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDaySelect = async () => {
    const selectedDay = selectRef?.current.value;
    if (selectedDay === "--NONE--") {
      alert("Please select a day");
      return;
    }
    const data = {
      day: selectedDay,
      name: exc.name,
      exerciseIMG: exc.gifUrl,
      exerciseID: exc.id,
    };

    const response = await fetch(`${localHost}/training/exercise`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const res = await response.json();
    if (res.data.user) {
      dispatch(setWorkOutSplit(res.data.user.workOutSplit));
    }
    alert("Exercise added to your WorkOut plan");
    closeModal();
  };

  return (
    <>
      <div className="flex justify-between gap-3 mt-5">
        <div className="w-1/2 flex items-center justify-center ">
          {exc && <img className="h-5/6 w-4/6" src={exc.gifUrl} alt="" />}
        </div>

        <div className="w-1/2 flex flex-col">
          <div className="flex justify-between items-center">
            <div className="text-left text-3xl my-3 font-mono font-bold">
              {exc && capFirstLetter(exc.name)}
            </div>
            <div>
              {isLoggedIn ? (
                <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                  onClick={openModal}
                >
                  ADD
                </button>
              ) : null}
              <CustomModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                title="Select Day"
                onSave={handleDaySelect}
              >
                <Select options={options} ref={selectRef} />
              </CustomModal>
            </div>
          </div>

          <div className="text-left text-base my-3 font-mono">
            {exc &&
              exc.instructions.length > 0 &&
              exc.instructions.map((para, index) => (
                <p key={index}>
                  {index + 1}. {para}
                </p>
              ))}
          </div>

          <div className="my-3 flex gap-4">
            <div className="border p-6 bg-[#FFF2DB] rounded-full">
              <img src={part} alt="" />
            </div>
            <div className="text-xl justify-center font-mono font-medium flex items-center">
              {exc && capFirstLetter(exc.bodyPart)}
            </div>
          </div>

          <div className="my-3 flex gap-4">
            <div className="border p-6 bg-[#FFF2DB] rounded-full">
              <img src={target} alt="" />
            </div>
            <div className="text-xl justify-center font-mono font-medium flex items-center">
              {exc && capFirstLetter(exc.target)}
            </div>
          </div>

          <div className="my-3 flex gap-4">
            <div className="border p-6 bg-[#FFF2DB] rounded-full">
              <img src={equipment} alt="" />
            </div>
            <div className="text-xl justify-center font-mono font-medium flex items-center">
              {exc && capFirstLetter(exc.equipment)}
            </div>
          </div>
        </div>
      </div>
      <Box id="exercisesTar" sx={{ mt: { lg: "109px" } }} mt="50px" py="10px">
        <Typography variant="h2" align="center" mb="20px">
          Similar <span style={{ color: "#FF2625" }}>Target Muscle</span>{" "}
          exercises
        </Typography>
        <Stack
          direction="row"
          sx={{ gap: { lg: "97px", xs: "40px" } }}
          flexWrap="wrap"
          justifyContent="center"
        >
          {currentTarExc &&
            currentTarExc.map((exercise, idx) => (
              <Card key={idx} exc={exercise} />
            ))}
        </Stack>
        {targetExc && targetExc.length > 3 && (
          <Stack sx={{ mt: { lg: "100px", xs: "60px" } }} alignItems="center">
            <Pagination
              color="standard"
              shape="rounded"
              defaultPage={1}
              count={Math.ceil(targetExc.length / exePerPage)}
              page={currentTarPage}
              onChange={paginateTar}
              size="large"
            />
          </Stack>
        )}
      </Box>
      <Box id="exercisesEqu" sx={{ mt: { lg: "109px" } }} mt="50px" py="10px">
        <Typography variant="h2" align="center" mb="20px">
          Similar <span style={{ color: "#FF2625" }}>Equipment</span> exercises
        </Typography>
        <Stack
          direction="row"
          sx={{ gap: { lg: "97px", xs: "40px" } }}
          flexWrap="wrap"
          justifyContent="center"
        >
          {currentEquipmentExc &&
            currentEquipmentExc.map((exercise, idx) => (
              <Card key={idx} exc={exercise} />
            ))}
        </Stack>
        {equipmentExc && equipmentExc.length > 3 && (
          <Stack sx={{ mt: { lg: "100px", xs: "60px" } }} alignItems="center">
            <Pagination
              color="standard"
              shape="rounded"
              defaultPage={1}
              count={Math.ceil(equipmentExc.length / exePerPage)}
              page={currentEquPage}
              onChange={paginateEqu}
              size="large"
            />
          </Stack>
        )}
      </Box>
    </>
  );
};

const capFirstLetter = (S) => {
  return S.split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getExerciseByID = async (id) => {
  const url = `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "cd1ab8b635mshe1544fc84a074d9p1a2d89jsna74ee61672ab",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

const getExerciseByBodyPart = async (target) => {
  if (!target) return;
  const url = `https://exercisedb.p.rapidapi.com/exercises/target/${target}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "cd1ab8b635mshe1544fc84a074d9p1a2d89jsna74ee61672ab",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

const getExerciseByEquipment = async (equipment) => {
  if (!equipment) return null;
  const url = `https://exercisedb.p.rapidapi.com/exercises/equipment/${equipment}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "cd1ab8b635mshe1544fc84a074d9p1a2d89jsna74ee61672ab",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export default ExerciseDetail;
