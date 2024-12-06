import React from 'react';
import CompanyCard from './CompanyCard';

const CompanyGrid = ({ companies }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
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

export default CompanyGrid;