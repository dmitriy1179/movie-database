const PaginationButtons = ({ currentPage, totalPages, getPrevPage, getNextPage, getPage}) => {

  return (
    <>
      <nav className='mb-4'>
        <div className="pagination pagination__responsive pagination__light px-5 d-flex justify-content-center">
          <div className="page-item" hidden={currentPage === 1}>
            <button onClick={getPrevPage} className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </button>
          </div>
          {totalPages == 1 ? (
            null
          ) : totalPages < 8 ? (
            Array(totalPages).fill().map((_, index) => (
              <div className={`page-item ${currentPage === index + 1 ? "active" : ""}`} key={index}>
                <button onClick={getPage} className="page-link" value={index + 1}>{index + 1}</button>
              </div>
            ))
          ) : currentPage < 5 ? (
            <>
              {Array(5).fill().map((_, index) => (
                <div className={`page-item ${currentPage === index + 1 ? "active" : ""}`} key={index}>
                  <button onClick={getPage} className="page-link" value={index + 1}>{index + 1}</button>
                </div>
              ))}
              <div className='mx-2 d-flex'>
                {Array(3).fill().map((_, index) => (
                  <span key={index} className="page-link border-0 pb-0 pt-3 px-1 bg-transparent">•</span>
                ))}
              </div>
              <div className="page-item">
                <button onClick={getPage} className="page-link" value={totalPages}>
                  {totalPages}
                </button>
              </div>
            </>
          ) : (
            currentPage <= totalPages - 4 ? (
              <>
                <div className="page-item">
                  <button onClick={getPage} className="page-link" value={1}>1</button>
                </div>
                <div className='mx-2 d-flex'>
                  {Array(3).fill().map((_, index) => (
                    <span key={index} className="page-link border-0 pb-0 pt-3 px-1 bg-transparent">•</span>
                  ))}
                </div>
                {Array(3).fill().map((_, index) => (
                  <div className={`page-item ${currentPage === currentPage + index - 1 ? "active" : ""}`} key={index}>
                    <button onClick={getPage} className="page-link" value={currentPage + index - 1}>{currentPage + index - 1}</button>
                  </div>
                ))}
                <div className='mx-2 d-flex'>
                  {Array(3).fill().map((_, index) => (
                    <span key={index} className="page-link border-0 pb-0 pt-3 px-1 bg-transparent">•</span>
                  ))}
                </div>
                <div className="page-item">
                  <button onClick={getPage} className="page-link" value={totalPages}>
                    {totalPages}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="page-item">
                  <button onClick={getPage} className="page-link" value={1}>1</button>
                </div>
                <div className='mx-2 d-flex'>
                  {Array(3).fill().map((_, index) => (
                    <span key={index} className="page-link border-0 pb-0 pt-3 px-1 bg-transparent">•</span>
                  ))}
                </div>
                {Array(5).fill().map((_, index) => (
                  <div className={`page-item ${currentPage === totalPages + index - 4 ? "active" : ""}`} key={index}>
                    <button onClick={getPage} className="page-link" value={totalPages + index - 4}>{totalPages + index - 4}</button>
                  </div>
                ))}
              </>
            )
          )}
          <div className="page-item" hidden={currentPage === totalPages}>
            <button onClick={getNextPage} className="page-link btn" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default PaginationButtons;