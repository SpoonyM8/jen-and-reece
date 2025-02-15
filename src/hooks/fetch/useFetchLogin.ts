import { BASE_API_URL } from "../../consts";
import { LoginResponse } from "./types";
import useFetch from "./useFetch"

const useFetchLogin = () => {
  const { data, loading, error, fetchData } = useFetch<LoginResponse>(`${BASE_API_URL}/login`, { method: 'POST' });

  return {
    data,
    loading,
    error,
    fetchData
  }
}

export default useFetchLogin