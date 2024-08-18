import React from 'react'

const Features = ({ name, image }) => {
  return (
    <div className="relative w-[550px]  overflow-hidden group shadow-[4_20px_14px_rgba(141,141,141,0.25)]">
      <img
        src={image}
        alt={`${name}/img`}
        className="w-[270px] rounded-2xl group-hover:opacity-100 opacity-60 cursor-pointer transition-all duration-200"
      />
      <div
        className="absolute top-[76%] left-[12%] bg-[#10defd] w-[130px] h-10 flex items-center justify-center rounded-2xl text-white 
      uppercase group-hover:opacity-100 opacity-60"
      >
        <h1>{name}</h1>
      </div>
    </div>
  );
};

export default Features