const Card = ({title, children}) => {

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h3 className="text-center">{title}</h3>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  )
}

export default Card