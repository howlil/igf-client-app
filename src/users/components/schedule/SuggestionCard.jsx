// SuggestionCard.jsx
const SuggestionCard = ({ company, productLine, platform, onBook }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border-b border-gray-200 gap-3 sm:gap-0">
      <div className="flex items-center space-x-4 w-full sm:w-auto">
        <div className="bg-gray-800 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs sm:text-sm">A</span>
        </div>
        <div className="flex-1 sm:flex-initial">
          <h3 className="font-medium text-sm sm:text-base">{company}</h3>
          <div className="flex flex-wrap gap-2 text-xs sm:text-sm mt-1">
            <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
              {productLine}
            </span>
            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {platform}
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={onBook}
        className="w-full sm:w-auto bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
      >
        Book
      </button>
    </div>
  );
};
  
export default SuggestionCard
  

  

  