import { BASE_API_URL } from "../../consts"
import { ExerciseResponse } from "./types"
import useFetch from "./useFetch"

const useFetchExercises = () => {
  const { data, loading, error, fetchData } = useFetch<ExerciseResponse>(`${BASE_API_URL}/exercise`, { method: 'GET' });

  return {
    data,
    loading,
    error,
    fetchData
  }
}

export default useFetchExercises;