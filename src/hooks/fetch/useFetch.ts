import { useState, useCallback } from "react";

const useFetch = <TData>(url: string, options: RequestInit = {}) => {
  const [data, setData] = useState<TData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const fetchData = useCallback(
    async (customOptions: RequestInit = {}) => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(url, { ...options, ...customOptions });
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError((err as BackendError).error);
      } finally {
        setLoading(false);
      }
    },
    [url, options]
  );

  return { data, loading, error, fetchData };
};

export default useFetch;