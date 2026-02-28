import React from "react";

// const useFetch = (url) => {
//   const [data, setData] = React.useState(null);
//   const [status, setStatus] = React.useState("idle");

//   const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer ' + import.meta.env.VITE_TMBD_TOKEN
//     }
//   };

//   const fetchRequest = async () => {
//     try {
//       setStatus("pending");
//       const response = await fetch(url, options);
//       if (!response.ok) {
//         throw new Error()
//       }
//       const result = await response.json()
//       setData(result)
//       setStatus("resolved");
//     } catch (e) {
//       setData(null)
//       setStatus("rejected");
//     }
//   }

//   React.useEffect(() => {
//     if (!url) return;
//     fetchRequest()
//   }, [url])

//   return [data, status]
// }

const useFetch = (params) => {
  const [data, setData] = React.useState(null);
  const [status, setStatus] = React.useState("idle");

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + import.meta.env.VITE_TMBD_TOKEN
    }
  };

  const fetchRequest = async (url) => {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error()
    }
    return await response.json();
  }

  React.useEffect(() => {
    if (!params) return;

    const getData = async () => {
      setStatus("pending");
      setData(null);

      try {
        let result;

        if (Array.isArray(params)) {
          result = await Promise.all(params.map((url) => fetchRequest(url)));
        } else {
          result = await fetchRequest(params);
        }

        console.log("result", result)
        setData(result);
        setStatus("resolved");

      } catch (e) {
        setData(null);
        setStatus("rejected");
      }
    };
    
    getData();

  }, [JSON.stringify(params)])

  return [data, status]
}

export default useFetch;
