import { useState, useCallback } from "react";

const useFetch = (url: string, options: RequestInit = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (customOptions: RequestInit = {}) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { ...options, ...customOptions });
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setError((err as any).message);
      } finally {
        setLoading(false);
      }
    },
    [url, options]
  );

  return { data, loading, error, fetchData };
};

export default useFetch;