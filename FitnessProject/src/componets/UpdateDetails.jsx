// UpdateDetails.jsx
import React, { useState, useRef } from "react";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import CustomModel from "./Modal.jsx";
import { localHost } from "../constants.js";
import { useDispatch } from "react-redux";
import { setUsername, setEmail } from "../store/UserSlice.js";

function UpdateDetails() {
  const dispatch = useDispatch();
  const [detailsModelOpen, setDetailsModelOpen] = useState(false);
  const selectUsernameRef = useRef(null);
  const selectEmailRef = useRef(null);

  const openDetailsModel = () => {
    setDetailsModelOpen(true);
  };

  const closeDetailsModal = () => {
    setDetailsModelOpen(false);
  };

  const handleDetails = async () => {
    try {
      const data = {
        username: selectUsernameRef?.current.value,
        email: selectEmailRef?.current.value,
      };

      if (data.username.trim() === "" && data.email.trim() === "") {
        alert("Enter at least one detail");
        return;
      }

      const result = await fetch(`${localHost}/users/update-account`, {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await result.json();
      dispatch(setUsername(res.data.username));
      dispatch(setEmail(res.data.email));
      alert("Details Updated Successfully");
      closeDetailsModal();
    } catch (error) {
      alert("User with same Email/Username already exists");
    }
  };

  return (
    <>
      <Button
        className="font-medium flex items-center justify-center w-full rounded cursor-pointer text-sm px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        onClick={openDetailsModel}
      >
        Update Details
      </Button>
      <CustomModel
        isOpen={detailsModelOpen}
        onRequestClose={closeDetailsModal}
        title={"Update Details"}
        onSave={handleDetails}
      >
        <Input
          label="New Username"
          ref={selectUsernameRef}
          className="w-full"
        />

        <Input
          type="email"
          label="New Email"
          ref={selectEmailRef}
          className="w-full"
        />
      </CustomModel>
    </>
  );
}

export default UpdateDetails;
