import React from "react";
import CharacterTable from "./components/character-profile/CharacterTable";
import Home from "./components/pages/Home";
import "./index.css";

const App: React.FC = () => {
  return (
    <>
      <Home />
      <div className="bg-gray-100 min-h-screen  flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl  ">
          <h1 className="px-8 font-got tracking-widest">
            Legendary Personalities of the Seven Kingdoms
          </h1>
          <CharacterTable />
        </div>
      </div>
    </>
  );
};

export default App;
