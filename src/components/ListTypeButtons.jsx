const ListTypeButtons = ({ title, changeHandler, type, query, isHidden }) => {
  const isPopular = type === "popular" || (!type && !query)
  return (
    <>
      <div hidden={isHidden}>
        <div className="d-flex justify-content-center justify-content-md-start my-4 flex-wrap gap-3 align-items-baseline">
          <h3 className="mb-0">{title}</h3>
          <div className="d-flex px-3 py-1 border border-secondary-subtle border-3 rounded-pill position-relative gap-3">
            <label className="fs-5 text-center"
              style={{
                width: "90px",
                cursor: isPopular ? "auto" : "pointer",
                zIndex: isPopular ? "1" : "unset",
                color: isPopular ? "#FFFFFF" : "unset"
              }}>Popular
              <input type="radio" name="type" onChange={changeHandler} value="popular" hidden checked={isPopular} />
            </label>
            <label className="fs-5 text-center"
              style={{
                width: "90px",
                cursor: isPopular ? "pointer" : "auto",
                zIndex: isPopular ? "unset" : "1",
                color: isPopular ? "unset" : "#FFFFFF"
              }}> Top rated
              <input type="radio" name="type" onChange={changeHandler} value="top_rated" hidden checked={type === "top_rated"} />
            </label>
            <div className="position-absolute rounded-pill bg-secondary"
              style={{
                width: isPopular ? "52%" : "55%",
                height: "100%",
                top: 0,
                left: 0,
                transition: "all .3s ease",
                transform: isPopular ? "translateX(0)" : "translateX(103px)"
              }}>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListTypeButtons