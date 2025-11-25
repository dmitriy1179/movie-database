const ListItem = ({item}) => {

  return (
    <div className="card">
      <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title text-center">{item.title}</h5>
        <p className="card-text">{item.release_date}</p>
        <a href="#" className="btn btn-primary btn-sm">Detail</a>
      </div>
    </div>
  )
}

export default ListItem;