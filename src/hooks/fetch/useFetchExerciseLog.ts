import { BASE_API_URL } from "../../consts"
import useFetch from "./useFetch"

const useFetchExerciseLog = () => {
  const { data, loading, error, fetchData } = useFetch(`${BASE_API_URL}/exercise/log`, { method: 'POST' });

  return {
    data,
    loading,
    error,
    fetchData
  }
}

export default useFetchExerciseLog;