import { useEffect, useState } from "react";

export default function useJsonFetch(url, opts = undefined) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(url, opts)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then((data) => {
        setData(data);
        setError(null);
      })
      .catch((e) => {
        setData(null);
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return [data, loading, error];
}
