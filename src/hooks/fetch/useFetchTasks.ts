import { BASE_API_URL } from "../../consts"
import { TasksResponse } from "./types"
import useFetch from "./useFetch"

const useFetchTasks = (categoryId: number | null) => {
  const { data, loading, error, fetchData } = useFetch<TasksResponse>(`${BASE_API_URL}/task/${categoryId}`, { method: 'GET'});

  return {
    data,
    loading,
    error,
    fetchData
  }
}

export default useFetchTasks;