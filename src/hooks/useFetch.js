import { useEffect, useState } from 'react';

import { LOADING, LOADED, FAILED } from 'constants/data';

const useFetch = (url, options) => {
  const [response, setResponse] = useState();
  const [status, setStatus] = useState(LOADING);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url, options);
        const json = await res.json();

        setResponse(json);
        setStatus(LOADED);
      } catch (error) {
        setStatus(FAILED);
        setError(error);
      }
    })();
  }, []);

  return { response, error, status };
};

export default useFetch;
