import React from "react";

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  return (
    <div className="flex items-center justify-between text-gray-500 p-4">
      <button
        className="px-4 py-2 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentPage === 1 ? true : false}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        {totalPages < 7 ? (
          Array.from({ length: totalPages }, (_, index) => {
            const pageIndex = index + 1;
            return (
              <button
                key={pageIndex}
                className={`px-2 rounded-sm ${
                  currentPage === pageIndex ? "bg-SelectedButtonColor" : ""
                }`}
                onClick={() => {
                  onPageChange(pageIndex);
                }}
              >
                {pageIndex}
              </button>
            );
          })
        ) : currentPage < 4 ? (
          Array.from({ length: 4 }, (_, index) => {
            const pageIndex = index + 1;
            return (
              <button
                key={pageIndex}
                className={`px-2 rounded-sm ${
                  currentPage === pageIndex ? "bg-SelectedButtonColor" : ""
                }`}
                onClick={() => {
                  onPageChange(pageIndex);
                }}
              >
                {pageIndex}
              </button>
            );
          })
        ) : (
          <button
            key={1}
            className="px-2 rounded-sm"
            onClick={() => {
              onPageChange(1);
            }}
          >
            1
          </button>
        )}
        {totalPages >= 7 && currentPage >= 4 ? "..." : null}
        {totalPages >= 7 && currentPage >= 4 && currentPage <= totalPages - 3
          ? Array.from({ length: 3 }, (_, index) => {
              const pageIndex = currentPage + index - 1;
              return (
                <button
                  key={pageIndex}
                  className={`px-2 rounded-sm ${
                    currentPage === pageIndex ? "bg-SelectedButtonColor" : ""
                  }`}
                  onClick={() => {
                    onPageChange(pageIndex);
                  }}
                >
                  {pageIndex}
                </button>
              );
            })
          : null}
        {totalPages >= 7 && currentPage <= totalPages - 3 ? "..." : null}
        {totalPages >= 7 ? (
          currentPage > totalPages - 3 ? (
            Array.from({ length: 4 }, (_, index) => {
              const pageIndex = totalPages - 3 + index;
              return (
                <button
                  key={pageIndex}
                  className={`px-2 rounded-sm ${
                    currentPage === pageIndex ? "bg-SelectedButtonColor" : ""
                  }`}
                  onClick={() => {
                    onPageChange(pageIndex);
                  }}
                >
                  {pageIndex}
                </button>
              );
            })
          ) : (
            <button
              key={totalPages}
              className="px-2 rounded-sm"
              onClick={() => {
                onPageChange(totalPages);
              }}
            >
              {totalPages}
            </button>
          )
        ) : null}
      </div>
      <button
        className="px-4 py-2 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentPage === totalPages ? true : false}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
