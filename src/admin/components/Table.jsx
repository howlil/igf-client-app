import React, { useState } from "react";

const DynamicTable = ({
  columns,
  data,
  positionTH,
  columnStyles,
  columnWidths,
  rowsPerPage = 13,
  onRowClick, // Callback for row click
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Paginate data
  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle page click
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="overflow-x-auto mt-5 mb-5">
      <table className="table-auto w-full border-collapse border border-gray-300">
        {/* Table Head */}
        <thead>
          <tr className="bg-gray-100">
            {columns.map((column, index) => (
              <th
                key={index}
                className={`border border-gray-300 px-4 py-2 ${positionTH} font-bold text-black`}
                style={{
                  width: columnWidths && columnWidths[index], // Apply column widths dynamically
                }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${
                rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
              } ${onRowClick ? "cursor-pointer hover:bg-gray-100" : ""}`}
              onClick={() => onRowClick && onRowClick(row)} // Trigger the row click callback if provided
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={`border border-gray-300 px-4 py-2 text-gray-700 ${
                    columnStyles[colIndex] || "text-left"
                  }`}
                  style={{
                    width: columnWidths && columnWidths[colIndex], // Apply column widths dynamically
                  }}
                >
                  {column.render
                    ? column.render(row[column.key], row)
                    : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end items-center mt-4">
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`px-3 py-1 border rounded ${
                currentPage === index + 1
                  ? "bg-red text-white"
                  : "bg-gray-100 text-gray-700"
              } hover:bg-red hover:text-white`}
              onClick={() => handlePageClick(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicTable;
