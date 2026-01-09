import React from "react";

const useFetch = (url) => {
  const [data, setData] = React.useState(null);
  const [status, setStatus] = React.useState("idle");

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + import.meta.env.VITE_TMBD_TOKEN
    }
  };

  const fetchRequest = async () => {
    try {
      setStatus("pending");
      const jsonData = await fetch(url, options);
      if (!jsonData.ok) {
        throw new Error()
      }
      const fetchData = await jsonData.json()
      setData(fetchData)
      setStatus("resolved");
    } catch (e) {
      setData(null)
      setStatus("rejected");
    }
  }

  React.useEffect(() => {
    if (!url) return;
    fetchRequest()
  }, [url])

  return [data, status]
}

export default useFetch;
