import { useState, useCallback } from "react";
import { BackendError } from "./types";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useFetch = <TData>(url: string, options: RequestInit = {}) => {
  const [data, setData] = useState<TData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const { token, removeToken } = useAuthContext();
  const navigate = useNavigate();

  const fetchData = useCallback(
    async (customOptions: RequestInit = {}) => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(url, { ...options, ...customOptions, headers: {
          ...options.headers, ...customOptions.headers, ...(token && { Authorization: token })
        }});
        if (response.status === 401) {
          removeToken();
          navigate('/');
          return;
        }

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
        return result;
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