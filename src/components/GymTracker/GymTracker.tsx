import { Button, List, ListItem, ListItemText } from "@mui/material";
import useFetchWorkouts from "../../hooks/fetch/useFetchWorkouts";
import { useEffect, useMemo, useState } from "react";
import useFetchExercises from "../../hooks/fetch/useFetchExercises";
import { Exercise, Workout } from "../../hooks/fetch/types";
import WorkoutComponent from "./WorkoutComponent";

const GymTracker = () => {
  const { data: workoutData, fetchData: fetchWorkoutData } = useFetchWorkouts();
  const { data: exerciseData, fetchData: fetchExerciseData } = useFetchExercises();
  const [activeWorkout, setActiveWorkout] = useState({
    isActive: false,
    id: 0
  });

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

  const goBack = () => setActiveWorkout({id: 0, isActive: false});

  return (
    <>
    {
      !activeWorkout.isActive ?
      <List>
        {workoutData?.map(workout => {
          return (
            <ListItem key={workout.id}>
              <ListItemText primary={workout.name} onClick={() => setActiveWorkout({id: workout.id, isActive: true})} />
            </ListItem> 
          )
        })}
      </List>
      :
      <>
        <Button onClick={goBack}>BACK</Button>
        {workouts && exerciseData && <WorkoutComponent workout={workouts.find(wkout => wkout.id === activeWorkout.id) as Workout} onSubmit={goBack} exercises={exerciseData}/>}
      </>
    }
    </>

  )
}

export default GymTracker;