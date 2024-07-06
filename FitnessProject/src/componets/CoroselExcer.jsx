import React, { useEffect, useState, forwardRef } from "react";
import Pagination from "@mui/material/Pagination";
import { Box, Stack } from "@mui/material";
import Card from "./Card";
import { useSelector } from "react-redux";

const CoroselExcer = forwardRef((props, ref) => {
  const data = useSelector((state) => state.Api?.userData);
  const [exercises, setExercises] = useState(data || []);

  useEffect(() => {
    setExercises(data || []);
  }, [data]);

  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 6;

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises =
    exercises && exercises.slice(indexOfFirstExercise, indexOfLastExercise);

  const paginate = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  return (
    <Box
      ref={ref}
      id="exercises"
      sx={{ mt: { lg: "109px" } }}
      mt="50px"
      py="10px"
    >
      <Stack
        direction="row"
        sx={{ gap: { lg: "97px", xs: "40px" } }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {currentExercises &&
          currentExercises.map((exercise, idx) => (
            <Card key={idx} exc={exercise} />
          ))}
      </Stack>
      {exercises && exercises.length > 6 && (
        <Stack sx={{ mt: { lg: "100px", xs: "60px" } }} alignItems="center">
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        </Stack>
      )}
    </Box>
  );
});

export default CoroselExcer;
