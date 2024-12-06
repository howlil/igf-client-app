import React, { useState } from 'react';


const FilterSection = ({ title, items, onChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="mb-4 md:mb-6 ">
      <div className="flex justify-between  items-center mb-2 md:mb-3">
        <h3 className="font-medium text-sm md:text-base">{title}</h3>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <svg 
            className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="red" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      {isExpanded && (
        <div className="space-y-2">
          {items.map((item) => (
            <label key={item} className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-red-600"
                onChange={(e) => onChange(item, e.target.checked)}
              />
              <span className="ml-2 text-gray-700 text-sm">{item}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSection;