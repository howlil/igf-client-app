import Layout from "./components/Layout";
import FilterSection from "./components/company/FilterSection";
import SearchBar from "./components/company/SearchBar";
import CompanyGrid from "./components/company/CompanyGrid";
import React, { useState, useEffect } from "react";
import api from "../utils/api";
import Swal from "sweetalert2";

export default function CompanyUser() {
  const [showFilters, setShowFilters] = useState(false);
  const [companies, setCompanies] = useState([]); // State for storing companies
  const [filteredCompanies, setFilteredCompanies] = useState([]); // State for filtered companies
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const filterCategories = {
    "Key Product Line": [
      "Online/PC Games",
      "Parts/accessories",
      "Mobile Games",
      "Art/Music/Design",
      "Game Hardware",
      "Blockchain",
      "Console Games",
      "Arcade Games",
      "E-Sports",
      "Middleware",
      "Software",
      "AR/VR",
    ],
    Country: ["Asia", "Europe", "North America", "Middle East"],
    "Business Type": ["Publisher", "Developer", "Both"],
    "Preferred Platform": ["PC", "Mobile", "Console"],
    "Preferred Genre": ["Action", "Adventure", "RPG", "Strategy"],
  };

  // Fetch company data from API
  async function get_data() {
    try {
      const res = await api.get("/companys-by-conference");
      if (res.data && Array.isArray(res.data.data)) {
        setCompanies(res.data.data); 
        setFilteredCompanies(res.data.data); // Initialize filtered data with the same array
      } else {
        console.error("Unexpected API response:", res.data);
        setCompanies([]);
        setFilteredCompanies([]);
      }
    } catch (error) {
      console.error(error);
      setCompanies([]);
      setFilteredCompanies([]);
    }
  }

  // Apply filters and search
  useEffect(() => {
    let filtered = companies;

    // Apply filters
    Object.entries(filters).forEach(([category, selectedItems]) => {
      if (selectedItems.length > 0) {
        filtered = filtered.filter((company) =>
          company[category.toLowerCase().replace(" ", "_")]?.some((item) =>
            selectedItems.includes(item.name)
          )
        );
      }
    });

    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter((company) =>
        company.company_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCompanies(filtered);
  }, [filters, searchTerm, companies]);

  // Initialize data on component mount
  useEffect(() => {
    get_data();
  }, []);

  // Handle filter changes
  const handleFilter = (category, item, checked) => {
    setFilters((prev) => ({
      ...prev,
      [category]: checked
        ? [...(prev[category] || []), item]
        : (prev[category] || []).filter((i) => i !== item),
    }));
  };

  // Handle search
  const handleSearch = (value) => {
    setSearchTerm(value);
  };
  console.log(companies)

  return (
    <Layout>
      <div>
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-white px-4 py-2 rounded-lg shadow-sm flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
            Filters
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          {/* Sidebar Filters */}
          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } md:block w-full md:w-64 flex-shrink-0 fixed md:relative top-0 left-0 h-full md:h-auto shadow-md z-50 md:z-0 bg-white md:bg-transparent p-4 md:p-0 overflow-y-auto`}
          >
            <div className="bg-white rounded-lg p-4 md:p-6">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h2 className="font-semibold">FILTER</h2>
                <button
                  className="text-red-600 md:hidden"
                  onClick={() => setShowFilters(false)}
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {Object.entries(filterCategories).map(([category, items]) => (
                <FilterSection
                  key={category}
                  title={category}
                  items={items}
                  onChange={(item, checked) =>
                    handleFilter(category, item, checked)
                  }
                />
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8">
              <h1 className="text-xl md:text-2xl font-semibold">
                Company{" "}
                <span className="text-gray-500 text-base md:text-lg">
                  Total {filteredCompanies.length} Company
                </span>
              </h1>
              <SearchBar onSearch={handleSearch} />
            </div>
            <CompanyGrid companies={companies} />
          </main>
        </div>

        {/* Overlay for mobile filters */}
        {showFilters && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
            onClick={() => setShowFilters(false)}
          />
        )}
      </div>
    </Layout>
  );
}
