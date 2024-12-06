const MeetingCard = ({ company, associations, productLine, platform, genre, country, bizMatching, status }) => {
  if (status === "not-available") {
    return <div className="text-gray-500 text-center py-2">Not Available</div>;
  }

  if (status === "lunch-break") {
    return <div className="bg-gray-100 p-2 sm:p-4 rounded-lg text-center text-gray-600">Lunch Break</div>;
  }

  return (
    <div className={`p-3 sm:p-4 rounded-lg ${status === "upcoming" ? "bg-blue-50" : "bg-gray-50"}`}>
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <div className="bg-gray-800 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs sm:text-sm">A</span>
          </div>
          <div className="flex-1 sm:flex-initial">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <h3 className="font-medium text-sm sm:text-base">{company}</h3>
              <span className="text-gray-600 text-xs sm:text-sm">{associations}</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs sm:text-sm mt-2">
              <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                {productLine}
              </span>
              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                {platform}
              </span>
              {genre && (
                <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">
                  {genre}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="text-xs sm:text-sm text-gray-600 space-y-1 w-full sm:w-auto sm:ml-auto">
          <div>Country: {country}</div>
          <div>Biz Matching: {bizMatching}</div>
        </div>
        {status === "pending" && (
          <div className="mt-3 flex justify-center">
            <button className="w-full sm:w-auto bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">
              Book Meeting
            </button>
          </div>
        )}
        {status === "waiting" && (
          <div className="mt-3 flex justify-center sm:justify-start">
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs sm:text-sm">
              Waiting for approval
            </span>
          </div>
        )}
        {status === "upcoming" && (
          <div className="mt-3 flex justify-center sm:justify-start">
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs sm:text-sm">
              Upcoming
            </span>
          </div>
        )}
      </div>

      {/* Status Indicators */}

    </div>
  );
};

export default MeetingCard