// UpdateAvatarImage.jsx
import React, { useState, useRef } from "react";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import CustomModel from "./Modal.jsx";
import { localHost } from "../constants.js";
import { useDispatch } from "react-redux";
import { setAvatar } from "../store/UserSlice.js";

function UpdateAvatarImage() {
  const dispatch = useDispatch();
  const [avatarModelOpen, setAvatarModelOpen] = useState(false);
  const selectAvatarRef = useRef(null);

  const openAvatarModel = () => {
    setAvatarModelOpen(true);
  };

  const closeAvatarModal = () => {
    setAvatarModelOpen(false);
  };

  const changeAvatarImage = async () => {
    const fileInput = selectAvatarRef.current;
    const file = fileInput.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await fetch(`${localHost}/users/avatar`, {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const res = await response.json();
      dispatch(setAvatar(res.data.avatar));
      closeAvatarModal();
    } else {
      alert("No file selected");
    }
  };

  return (
    <>
      <Button
        className="font-medium flex items-center justify-center w-full rounded cursor-pointer text-sm px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        onClick={openAvatarModel}
      >
        Update Avatar
      </Button>
      <CustomModel
        isOpen={avatarModelOpen}
        onRequestClose={closeAvatarModal}
        title={"New Avatar Image"}
        onSave={changeAvatarImage}
      >
        <Input type="file" ref={selectAvatarRef} />
      </CustomModel>
    </>
  );
}

export default UpdateAvatarImage;
