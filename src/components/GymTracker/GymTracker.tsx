import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import useFetchWorkouts from "../../hooks/fetch/useFetchWorkouts";
import { useEffect } from "react";
import useFetchExercises from "../../hooks/fetch/useFetchExercises";
import { Exercise, Workout } from "../../hooks/fetch/types";

const GymTracker = () => {
  const { data: workoutData, fetchData: fetchWorkoutData } = useFetchWorkouts();
  const { data: exerciseData, fetchData: fetchExerciseData } = useFetchExercises();

  const workouts: Workout = workoutData?.map(workout => {
    return {
      id: workout.id,
      name: workout.name,
      exercises: workout.exerciseIds.map(exerciseId => ({
        id: exerciseId,
        name: (exerciseData?.find(exercise => exercise.id === exerciseId) as Exercise).name
      }))
    }
  })

  useEffect(() => {
    fetchWorkoutData();
    fetchExerciseData();
  }, []);

  console.log(workouts);
  /*
  inside of <TableBody/>:
  {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
  */
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Workout title</TableCell>
            <TableCell>Set 1 Weight</TableCell>
            <TableCell>Set 2 Reps</TableCell>
            <TableCell>Set 2 Weight</TableCell>
            <TableCell>Set 2 Reps</TableCell>
            <TableCell>Set 3 Weight</TableCell>
            <TableCell>Set 3 Reps</TableCell>
            <TableCell>Set 4 Weight</TableCell>
            <TableCell>Set 4 Reps</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {workoutData?.map((workout) => (
            <TableRow
              key={workout.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {workout.name}
              </TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default GymTracker;