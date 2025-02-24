import { BASE_API_URL } from "../../consts"
import { CategoriesResponse } from "./types"
import useFetch from "./useFetch"

const useFetchCategories = () => {
  const { data, loading, error, fetchData } = useFetch<CategoriesResponse>(`${BASE_API_URL}/category`, { method: 'GET' });

  return {
    data,
    loading,
    error,
    fetchData
  }
}

export default useFetchCategories;