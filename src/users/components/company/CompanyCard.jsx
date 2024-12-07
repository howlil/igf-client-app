import React from 'react';

const CompanyCard = ({ onRedirect, logo, category, name }) => {
  return (
    <div
      onClick={onRedirect}
      className="bg-white cursor-pointer rounded-lg p-4 md:p-6 shadow-md">
      <div className="bg-red-100 text-red-600 text-xs md:text-sm px-2 md:px-3 py-1 rounded-full inline-block mb-3 md:mb-4">
        {category}
      </div>
      <div className="flex justify-center mb-3 md:mb-4">
        <img
          src={logo ? `${import.meta.env.VITE_API_URL}/${logo}` : "/vite.svg"}
          alt={name}
          className="w-24 h-24 md:w-32 md:h-32 object-contain"
        />
      </div>
      <h3 className="text-center text-gray-800 font-medium text-sm md:text-base">{name}</h3>
    </div>
  );
};

export default CompanyCard