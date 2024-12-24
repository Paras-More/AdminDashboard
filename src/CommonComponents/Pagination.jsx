import { useState } from "react";
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";

function Pagination({ totalPages,setCurrentPage,currentPage }) {

  const itemsPerPage = 10;
  const currentRangeStart = Math.floor((currentPage - 1) / itemsPerPage) * itemsPerPage + 1;
  const currentRangeEnd = Math.min(currentRangeStart + itemsPerPage - 1, totalPages);
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="flex items-center justify-center gap-5 mt-5 py-2 border bg-white">
      {/* Previous Button */}
      {currentPage > 1 && (
        <button
          onClick={() =>handlePageChange(currentPage > 1 ? currentPage -1 : 1)}
          className="px-4 py-2 bg-customOrange text-white rounded hover:bg-customOrange">
          <GrLinkPrevious/>
        </button>
      )} 


      {/* Page Numbers */}
      <div className="flex gap-2">
        {Array.from({ length: currentRangeEnd - currentRangeStart + 1 }, (_, i) => currentRangeStart + i).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 rounded ${
              page === currentPage
                ? "bg-customOrange text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      {currentPage < totalPages && (
        <button
          onClick={() => handlePageChange(currentPage+1)}
          className="px-4 py-2 bg-customOrange text-white rounded hover:bg-customOrange"
        >
          <GrLinkNext/>
        </button>
      )} 
    </div>
  );
}

export default Pagination;
