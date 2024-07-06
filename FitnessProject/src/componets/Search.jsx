import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { updateSearch } from "../store/APISlice";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = () => {
    dispatch(updateSearch(["name",searchTerm]));
  };

  return (
    <div className="max-w-[100%] my-4 flex flex-col">
      <p className="text-5xl font-bold py-8">Awesome Exercises You</p>
      <p className="text-5xl font-bold ">Should Know</p>
      <div className="flex items-center mt-5 gap-0 py-8 justify-center">
        <TextField
          id="outlined-search"
          label="Search Exercises"
          sx={{
            input: { fontWeight: "700", border: "none", borderRadius: "4px" },
            width: { lg: "1000px", xs: "350px" },
            backgroundColor: "#fff",
            borderRadius: "40px",
            marginRight: 0, // Remove the default margin-right
          }}
          type="search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          size="large"
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: "#2196F3", // Blue background for the default state
            color: "#fff",
            textTransform: "none",
            width: { lg: "143px", xs: "80px" },
            height: "56px",
            fontSize: { lg: "20px", xs: "14px" },
            "&:hover": {
              bgcolor: "#FF2625", // Change background to #FF2625 on hover
            },
          }}
          onClick={handleSubmit}
        >
          Search
        </Button>
      </div>
    </div>
  );
}

export default Search;
