import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <button className={`px-4 py-2 rounded-l-lg ${currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-teal-500 hover:bg-teal-700 cursor-pointer"}`} disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button key={page} className={`px-4 py-2 cursor-pointer ${currentPage === page ? "bg-teal-700 text-white" : "bg-white text-teal-500 hover:bg-blue-100"}`} onClick={() => handlePageChange(page)}>
          {page}
        </button>
      ))}
      <button
        className={`px-4 py-2 rounded-r-lg ${currentPage === totalPages ? "bg-gray-200 cursor-not-allowed" : "text-white bg-teal-500 hover:bg-teal-700 cursor-pointer"}`}
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
