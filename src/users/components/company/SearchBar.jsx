const SearchBar = ({ onSearch }) => {
    return (
      <div className="relative w-full md:w-72">
        <input
          type="text"
          placeholder="Search participant"
          className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
          onChange={(e) => onSearch(e.target.value)}
        />
        <svg 
          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </div>
    );
  };
  
  export default SearchBar;