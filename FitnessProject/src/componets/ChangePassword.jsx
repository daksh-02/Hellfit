// ChangePassword.jsx
import React, { useState, useRef } from "react";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import CustomModel from "./Modal.jsx";
import { localHost } from "../constants.js";

function ChangePassword() {
  const [passwordModelOpen, setPasswordModelOpen] = useState(false);
  const selectOldPasswordRef = useRef(null);
  const selectNewPasswordRef = useRef(null);
  const selectNewPasswordRef2 = useRef(null);

  const openPasswordModel = () => {
    setPasswordModelOpen(true);
  };

  const closePasswordModal = () => {
    setPasswordModelOpen(false);
  };

  const handlePassword = async () => {
    try {
      const data = {
        newPassword: selectNewPasswordRef?.current.value,
        oldPassword: selectOldPasswordRef?.current.value,
      };

      const newPassword2 = selectNewPasswordRef2?.current.value;

      if (!newPassword2 || data.newPassword !== newPassword2) {
        alert("Your new password does not match");
        closePasswordModal();
      }

      const result = await fetch(`${localHost}/users/change-password`, {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await result.json();
      alert("Password changed successfully");
      closePasswordModal();
    } catch (error) {
      alert("Incorrect old password");
    }
  };

  return (
    <>
      <Button
        className="font-medium flex items-center justify-center w-full rounded cursor-pointer text-sm px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        onClick={openPasswordModel}
      >
        Update Password
      </Button>
      <CustomModel
        isOpen={passwordModelOpen}
        onRequestClose={closePasswordModal}
        title={"Update Password"}
        onSave={handlePassword}
      >
        <Input
          type="password"
          label="Old Password"
          placeholder="Enter your old password"
          ref={selectOldPasswordRef}
          className="w-full"
        />

        <Input
          type="password"
          label="New Password"
          placeholder="Enter your new password"
          ref={selectNewPasswordRef}
          className="w-full"
        />

        <Input
          type="password"
          label="New Password"
          placeholder="Re-enter your new password"
          ref={selectNewPasswordRef2}
          className="w-full"
        />
      </CustomModel>
    </>
  );
}

export default ChangePassword;
