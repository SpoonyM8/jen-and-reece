import React, { useRef } from "react";
import { Exercise, Workout } from "../../hooks/fetch/types";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import ExerciseRow from "./ExerciseRow";
import { ExerciseSetsWithId } from "../../types";
import useFetchExerciseLog from "../../hooks/fetch/useFetchExerciseLog";

type WorkoutComponentProps = {
  workout: Workout;
  onSubmit: () => void;
  exercises: Exercise[];
}
const WorkoutComponent: React.FC<WorkoutComponentProps> = ({ workout, onSubmit }) => {
  const { fetchData } = useFetchExerciseLog();
  const refs = useRef<ExerciseSetsWithId[]>(workout.exercises.map(exercise => ({
    id: exercise.id,
    firstSet: {
      weight: 0,
      reps: 0
    }
  })));

  const handleSubmit = () => {
    const todayDate = new Date(); 
    todayDate.setMinutes(todayDate.getMinutes() - todayDate.getTimezoneOffset());
    
    // Dont include exercises that were not filled out
    const body = refs.current.filter(exercise => exercise.firstSet.weight !== 0).map(exercise => ({
      ...exercise,
      dateCompleted: todayDate.toISOString().slice(0,10)
    }));
    fetchData({
      body: JSON.stringify(body)
    });
    onSubmit();
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Typography variant="h3">{workout.name}</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Exercise</TableCell>
              <TableCell>Set 1 Weight</TableCell>
              <TableCell>Set 1 Reps</TableCell>
              <TableCell>Set 2 Weight</TableCell>
              <TableCell>Set 2 Reps</TableCell>
              <TableCell>Set 3 Weight</TableCell>
              <TableCell>Set 3 Reps</TableCell>
              <TableCell>Set 4 Weight</TableCell>
              <TableCell>Set 4 Reps</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workout?.exercises?.map(exercise => {
              const key = exercise.id;
              const elRef = (refs.current.find(ex => exercise.id === ex.id) as ExerciseSetsWithId);
              return <ExerciseRow key={key} exercise={exercise} exerciseRef={elRef}/>
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={handleSubmit}> Submit </Button>
    </>
  );
}

export default WorkoutComponent