import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserData } from "../store/APISlice.js";

const Fetch = () => {
  const searchValue = useSelector((state) => state.Api?.search);
  const dispatch = useDispatch();
  const [currentSearch, setCurrentSearch] = useState(searchValue);

  async function fetchData() {
    const url =
      currentSearch.length > 0
        ? `https://exercisedb.p.rapidapi.com/exercises/${currentSearch[0]}/${currentSearch[1]}?limit=1400`
        : "https://exercisedb.p.rapidapi.com/exercises?limit=1400";
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
      dispatch(updateUserData(result));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [currentSearch]);

  useEffect(() => {
    setCurrentSearch(searchValue);
  }, [searchValue]);

  return null;
};

export default Fetch;
