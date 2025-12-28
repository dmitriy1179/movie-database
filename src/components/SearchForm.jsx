import React from "react";

const SearchForm = ({ onSearch, placeholder, initialValue = "" }) => {
  const [search, setSearch] = React.useState(initialValue);
  const [isError, setIsError] = React.useState(false);
  const inputRef = React.useRef(null);

  const changeHandler = (e) => {
    setSearch(e.target.value);
    if (isError) setIsError(false);
  };

  const clearInput = () => {
    setSearch("");
    setIsError(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
    onSearch("");
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!search.trim()) {
      setIsError(true);
      setSearch("");
      if (inputRef.current) inputRef.current.focus();
      return;
    }

    setIsError(false);
    onSearch(search.trim());
  };

  React.useEffect(() => {
    setSearch(initialValue);
  }, [initialValue]);

  return (
    <form onSubmit={submitHandler} noValidate>
      <div className="row justify-content-center">
        <div className="col-md-10 position-relative">
          <input
            ref={inputRef}
            type="text"
            className={`form-control ${isError ? "is-invalid placeholder-error" : ""}`}
            style={{ paddingRight: "40px" }}
            onChange={changeHandler}
            value={search}
            placeholder={isError ? "Please enter a search term" : placeholder}
            required
          />
          {search && (
            <button
              type="button"
              className="btn-close"
              aria-label="Clear search"
              onClick={clearInput}
              style={{
                position: "absolute",
                top: "50%",
                right: "20px",
                transform: "translateY(-50%)",
                zIndex: 3
              }}
            ></button>
          )}
        </div>
        <div className="col-5 col-md-2 mt-3 mt-md-0">
          <button className="btn btn-secondary w-100" type="submit">
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;