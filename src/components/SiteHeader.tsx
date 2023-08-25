import React from "react";

const SiteHeader = () => {
  return (
    <div className="sticky shadow-md top-0 gap-4 bg-gray-100 text-white h-20 flex items-center justify-center">
      <div>
        <img
          src={process.env.PUBLIC_URL + "assets/logo.png"}
          alt="Logo"
          className="h-12 w-12 mr-2 text-white"
        />
      </div>
      <h1 className="text-4xl font-got tracking-widest text-red-600">
        <span className="font-serif text-gray-800">Wiki</span> of GOT Persona
      </h1>
    </div>
  );
};

export default SiteHeader;
