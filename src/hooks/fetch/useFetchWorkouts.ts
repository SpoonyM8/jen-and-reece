import { BASE_API_URL } from "../../consts"
import { WorkoutTemplateResponse } from "./types"
import useFetch from "./useFetch"

const useFetchWorkouts = () => {
  const { data, loading, error, fetchData } = useFetch<WorkoutTemplateResponse>(`${BASE_API_URL}/exercise/template`, { method: 'GET' });

  return {
    data,
    loading,
    error,
    fetchData
  }
}

export default useFetchWorkouts;