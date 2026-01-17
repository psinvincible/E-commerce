import React from 'react'

const ProductPagination = ({changePage, pagination}) => {
  return (
    <>
      {pagination.pages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
          <button 
          disabled={pagination.page === 1}
          onClick={() => changePage(pagination.page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>

          {Array.from({length: pagination.pages}).map((_, i) => {
            const pageNum = i + 1;
            return (
              <button
              key={pageNum}
              onClick={() => changePage(pageNum)}
              className={`px-3 py-1 rounded border ${
                pagination.page === pageNum ? "bg-black text-white" : "hover:bg-gray-600"
              }`}
              >
                {pageNum}
              </button>
            )
          })}

          <button 
          disabled={pagination.page === pagination.pages}
          onClick={() => changePage(pagination.page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>

        </div>
      )}
    </>
  )
}

export default ProductPagination
