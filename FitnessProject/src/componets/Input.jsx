import React, { useId } from "react";

function Input({ className, type = "text", label, ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      <div className="flex ">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      </div>
      
      <div className="flex">
      <input
        type={type}
        className={`py-2 rounded-lg bg-white text-black outline-none
      w-5/6 border-gray-500 focus:bg-gray-100 duration-200 ${className}`}
        ref={ref}
        id={id}
        {...props}
      />
      </div>
    </div>
  );
}

export default React.forwardRef(Input);
