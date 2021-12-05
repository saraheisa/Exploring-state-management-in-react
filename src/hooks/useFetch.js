import { useState, useEffect } from "react";

export const REQUEST_STATUS = {
  PENDING: "pending",
  SUCCESS: "success",
  ERROR: "error",
};

export default function useFetch(getData, ...options) {
  const [data, setData] = useState([]);
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.PENDING);

  useEffect(() => {
    getData(...options)
      .then((data) => {
        setData(data);
        setRequestStatus(REQUEST_STATUS.SUCCESS);
      })
      .catch((err) => setRequestStatus(REQUEST_STATUS.ERROR));
  }, []);

  return { data, requestStatus };
}
