import React, { useRef } from "react";
import { Workout } from "../../hooks/fetch/types";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import ExerciseRow from "./ExerciseRow";
import { ExerciseSets, ExerciseSetsByName } from "../../types";

type WorkoutComponentProps = {
  workout: Workout
}


const WorkoutComponent: React.FC<WorkoutComponentProps> = ({ workout }) => {
  const refs = useRef<ExerciseSetsByName[]>(workout.exercises.map(exercise => ({
    [exercise.name]: {
      firstSet: {
        weight: 0,
        reps: 0
      }
    }
  })));

  const handleSubmit = () => {
    console.log(refs)
  }

  return (
    <>
    <TableContainer component={Paper}>
      <Typography variant="h3">{workout.name}</Typography>
      <Table  aria-label="simple table">
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
            const key = exercise.name;
            const elRef = (refs.current.find(ex => exercise.name in ex) as ExerciseSetsByName)[key];
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