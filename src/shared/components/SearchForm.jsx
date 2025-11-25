import React from "react";

const SearchForm = ({ onSearch }) => {
  const [search, setSearch] = React.useState("");

  const changeHandler = (e) => {
    const targetValue = e.target.value;
    setSearch(targetValue);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    onSearch(search)
  }


  return (
    <form onSubmit={submitHandler}>
      <div className="row">
        <div className="col-10">
          <input type="text" className="form-control" onChange={changeHandler} value={search} />
        </div>
        <div className="col-2">
          <button className="btn btn-primary w-100" type="submit">Search</button>
        </div>
      </div>
    </form>
  )
}

export default SearchForm