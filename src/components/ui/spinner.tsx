import React from "react";

function Spinner() {
  return (
    <div className="h-screen bg-white">
      <div className="flex justify-center items-center h-full gap-6">
        <img
          className="h-16 w-16"
          src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
          alt=""
        />
        <div className="text-bold text-gray-800">Loading...</div>
      </div>
    </div>
  );
}

export default Spinner;
