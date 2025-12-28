const Score = ({ details, isHiddenTitle = false, classScore = "", isHidden = false }) => {
  const score = Math.round(details?.vote_average * 10);
  let barColor = "#21d07a";
  let trackColor = "#204529";
  if (score < 40) {
    barColor = "#db2360";
    trackColor = "#571435";
  } else if (score < 70) {
    barColor = "#d2d531";
    trackColor = "#423d0f";
  }
  return (
    <>
      <div hidden={isHidden}>
        <div className={`d-flex align-items-center mb-2 ${classScore}`}>
          <div className="d-flex align-items-center justify-content-center rounded-circle"
            style={{
              width: "64px",
              height: "64px",
              background: "#b5b5b5",
            }}
          >
            <div
              className="rounded-circle d-flex justify-content-center align-items-center"
              style={{
                width: "60px",
                height: "60px",
                background: `conic-gradient(${barColor} ${score * 3.6}deg, ${trackColor} 0deg)`,
              }}
            >
              <div
                className="d-flex justify-content-center align-items-center rounded-circle"
                style={{
                  width: "52px",
                  height: "52px",
                  background: "#b5b5b5",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                {score}<span style={{ fontSize: "0.5em", verticalAlign: "top" }}>%</span>
              </div>
            </div>
          </div>
          <span className="ms-2 fw-bold" style={{ width: "50px", lineHeight: "1.2" }} hidden={isHiddenTitle}>
            User Score
          </span>
        </div>
      </div>
    </>
  )
}

export default Score;