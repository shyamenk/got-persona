import React from "react";
import CharacterTable from "./character-profile/CharacterTable";

const TableContainer = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10 flex justify-center items-center">
      <div className="bg-white py-8 rounded-lg shadow-md w-full max-w-4xl  ">
        <h1 className="px-8 font-got tracking-widest text-red-500">
          Legendary Personalities of the Seven Kingdoms
        </h1>
        <CharacterTable />
      </div>
    </div>
  );
};

export default TableContainer;
