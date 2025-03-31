import { useEffect, useMemo, useState } from "react";
import useFetchExercises from "../../hooks/fetch/useFetchExercises";
import useFetchWorkouts from "../../hooks/fetch/useFetchWorkouts";
import { Exercise, Workout } from "../../hooks/fetch/types";
import { Button, List, ListItem, ListItemText } from "@mui/material";
import WorkoutEditor from "./WorkoutEditor";

const WorkoutTemplateManager = () => {
  const { data: workoutData, fetchData: fetchWorkoutData } = useFetchWorkouts();
  const { data: exerciseData, fetchData: fetchExerciseData } = useFetchExercises();

  const workouts: Workout[] = useMemo(() => workoutData?.map(workout => {
    return {
      id: workout.id,
      name: workout.name,
      exercises: workout.exerciseIds.map(exerciseId => ({
        id: exerciseId,
        name: (exerciseData?.find(exercise => exercise.id === exerciseId) as Exercise).name
      }))
    }
  }), [workoutData, exerciseData]);

  useEffect(() => {
    fetchWorkoutData();
    fetchExerciseData();
  }, []);

  return (
    <>
    <List>
      {exerciseData && workouts?.map(workout => {
        return (
          <WorkoutEditor key={"WorkoutEditor: " + workout.id} workout={workout} exercises={exerciseData}/> 
        )
      })}
    </List>
    </>

  )
}

export default WorkoutTemplateManager;