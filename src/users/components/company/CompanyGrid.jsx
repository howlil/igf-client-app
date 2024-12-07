import React from 'react';
import CompanyCard from './CompanyCard';

const CompanyGrid = ({ companies }) => {
  console.log(companies)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {companies.map((company, index) => (
        <CompanyCard
          key={index}
          onRedirect={() => window.location.href = `/u/companies/${company.id}`}
          logo={company.company_logo}
          category={
            company.key_product_line && company.key_product_line.length > 0
              ? company.key_product_line[0].name
              : company.company_type
          }
          name={company.company_name}
        />
      ))}
    </div>
  );
};

export default CompanyGrid;
