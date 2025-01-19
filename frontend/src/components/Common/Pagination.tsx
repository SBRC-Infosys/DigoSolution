import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    const pages: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="-mx-4 flex flex-wrap" data-wow-delay=".15s">
      <div className="w-full px-4">
        <ul className="flex items-center justify-center pt-8">
          <li className="mx-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Prev
            </button>
          </li>
          {/* Page Numbers */}
          {getPageNumbers().map((page) => (
            <li key={page} className="mx-1">
              <button
                onClick={() => handlePageChange(page)}
                className={`flex h-9 min-w-[36px] items-center justify-center rounded-md px-4 text-sm transition ${
                  currentPage === page
                    ? "bg-primary text-white"
                    : "bg-body-color bg-opacity-[15%] text-body-color hover:bg-primary hover:bg-opacity-100 hover:text-white"
                }`}
              >
                {page}
              </button>
            </li>
          ))}
          <li className="mx-1">
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
