const Spinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-grow-1">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

const StatusResolver = ({status, noData, children}) => {
  if (status === "pending") {
    return <Spinner />;
  }
  if (noData) {
    return <h3 className="text-center text-primary pt-4">There is no movie with that title</h3>;
  }
  if (status === "rejected") {
    return <h3 className="text-center text-danger pt-4">Something went wrong</h3>;
  }
  if (status === "idle") {
    return null;
  }
  if (status === "resolved") {
    return children;
  }
};

StatusResolver.defaultProps = {
  noData: false,
};

export default StatusResolver;
