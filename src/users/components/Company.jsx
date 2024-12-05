import React, { useState } from 'react';
import vite from "../../../public/vite.svg"

// CompanyCard Component
const CompanyCard = ({ logo, category, name }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full inline-block mb-4">
        {category}
      </div>
      <div className="flex justify-center mb-4">
        <img src={vite} alt={name} className="w-32 h-32 object-contain" />
      </div>
      <h3 className="text-center text-gray-800 font-medium">{name}</h3>
    </div>
  );
};

// FilterSection Component
const FilterSection = ({ title, items, onChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium">{title}</h3>
        <button onClick={() => setIsExpanded(!isExpanded)}>
          <svg className={`w-4 h-4 transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <span className="ml-2 text-gray-700">{item}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

// SearchBar Component
const SearchBar = ({ onSearch }) => {
  return (
    <div className="relative w-72">
      <input
        type="text"
        placeholder="Search participant"
        className="w-full pl-10 pr-4 py-2 border rounded-lg"
        onChange={(e) => onSearch(e.target.value)}
      />
      <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  );
};

// CompanyGrid Component
const CompanyGrid = ({ companies }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {companies.map((company, index) => (
        <CompanyCard
          key={index}
          logo={company.logo}
          category={company.category}
          name={company.name}
        />
      ))}
    </div>
  );
};

// Main Company Page Component
const CompanyPage = () => {
  const filterCategories = {
    "Key Product Line": [
      'Online/PC Games', 'Parts/accessories', 'Mobile Games',
      'Art/Music/Design', 'Game Hardware', 'Blockchain',
      'Console Games', 'Arcade Games', 'E-Sports',
      'Middleware', 'Software', 'AR/VR'
    ],
    "Country": ['Asia', 'Europe', 'North America', 'Middle East'],
    "Business Type": ['Publisher', 'Developer', 'Both'],
    "Preferred Platform": ['PC', 'Mobile', 'Console'],
    "Preferred Genre": ['Action', 'Adventure', 'RPG', 'Strategy']
  };

  // Initialize filters with empty arrays for each category
  const [filters, setFilters] = useState(
    Object.keys(filterCategories).reduce((acc, category) => {
      acc[category] = [];
      return acc;
    }, {})
  );

  const handleSearch = (value) => {
    console.log('Searching:', value);
  };

  const handleFilter = (category, item, checked) => {
    setFilters(prev => ({
      ...prev,
      [category]: checked 
        ? [...prev[category], item]
        : prev[category].filter(i => i !== item)
    }));
  };

  // Sample company data
  const sampleCompanies = [
    {
      logo: "/api/placeholder/100/100",
      category: "Online/PC Games",
      name: "Participant Name 1"
    },
    {
      logo: "/api/placeholder/100/100",
      category: "Mobile Games",
      name: "Participant Name 2"
    }
  ];

  return (
    <div className="flex gap-8 p-8">
      {/* Sidebar Filters */}
      <aside className="w-64 flex-shrink-0">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold">FILTER</h2>
            <button className="text-red-600">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v7h7V4H4z" />
              </svg>
            </button>
          </div>
          {Object.entries(filterCategories).map(([category, items]) => (
            <FilterSection
              key={category}
              title={category}
              items={items}
              onChange={(item, checked) => handleFilter(category, item, checked)}
            />
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">
            Company <span className="text-gray-500 text-lg">Total 54 Company</span>
          </h1>
          <SearchBar onSearch={handleSearch} />
        </div>
        <CompanyGrid companies={sampleCompanies} />
      </main>
    </div>
  );
};

export default CompanyPage;