const TimeSlot = ({ time, children }) => (
  <div className="flex flex-col sm:flex-row border-b border-gray-200">
    <div className="w-full sm:w-24 p-2 sm:p-4 text-sm text-gray-600 border-b sm:border-b-0 sm:border-r border-gray-200 flex-shrink-0 bg-gray-50 sm:bg-transparent">
      {time}
    </div>
    <div className="flex-1 p-2 sm:p-4">{children}</div>
  </div>
);
export default TimeSlot