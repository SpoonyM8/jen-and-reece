import { useEffect, useState } from "react";
import useFetchExercises from "../../hooks/fetch/useFetchExercises";
import EditableExercise from "./EditableExercise";
import { Exercise } from "../../hooks/fetch/types";
import NewExercise from "./NewExercise";

const ExerciseManager = () => {
  const { data: exerciseData, fetchData: fetchExerciseData } = useFetchExercises();
  const [createdExercises, setCreatedExercises] = useState<Exercise[]>([]);

  const exercises = createdExercises.concat(exerciseData || []);

  useEffect(() => {
    fetchExerciseData();
  }, [])

  const onAddNewExercise = (exercise: Exercise) => {
    setCreatedExercises([...createdExercises, exercise])
  }

  return (
    <>
    <NewExercise key="New Exercise" onAddNewExercise={onAddNewExercise} />
    {exercises?.map(exercise => 
      <EditableExercise key={`Editable ${exercise.id}`} exercise={exercise} />
    )}
    </>
  )
}

export default ExerciseManager;