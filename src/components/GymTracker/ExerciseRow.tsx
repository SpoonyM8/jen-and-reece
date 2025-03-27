import { TableCell, TableRow, TextField } from "@mui/material"
import { ExerciseSets } from "../../types";
import { Exercise } from "../../hooks/fetch/types";
import { useState } from "react";
import ExerciseHistory from "./ExerciseHistory";

const HtmlInputProps = {
  style: {
    paddingRight: 2,
    paddingLeft: 2
  }
}

type ExerciseRowProps = {
  exercise: Exercise,
  exerciseRef: ExerciseSets
}
const ExerciseRow: React.FC<ExerciseRowProps> = ({ exercise, exerciseRef }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow
        key={exercise.name}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row" onClick={() => setOpen(true)}>
          {exercise.name}
        </TableCell>
        <TableCell>
          <TextField slotProps={{ htmlInput: HtmlInputProps }} onChange={(e) => exerciseRef.firstSet = { weight: Number(e.target.value), reps: exerciseRef.firstSet.reps }}/>
        </TableCell>
        <TableCell>
          <TextField slotProps={{ htmlInput: HtmlInputProps }} onChange={(e) => exerciseRef.firstSet = { weight: exerciseRef.firstSet.weight, reps: Number(e.target.value) }}/>
        </TableCell>
        <TableCell>
          <TextField slotProps={{ htmlInput: HtmlInputProps }} onChange={(e) => exerciseRef.secondSet = { weight: Number(e.target.value), reps: exerciseRef.secondSet?.reps || 0 }}/>
        </TableCell>
        <TableCell>
          <TextField slotProps={{ htmlInput: HtmlInputProps }} onChange={(e) => exerciseRef.secondSet = { weight: exerciseRef.secondSet?.weight || 0, reps: Number(e.target.value) }}/>
        </TableCell>
        <TableCell>
          <TextField slotProps={{ htmlInput: HtmlInputProps }} onChange={(e) => exerciseRef.thirdSet = { weight: Number(e.target.value), reps: exerciseRef.thirdSet?.reps || 0 }}/>
        </TableCell>
        <TableCell>
          <TextField slotProps={{ htmlInput: HtmlInputProps }} onChange={(e) => exerciseRef.thirdSet = { weight: exerciseRef.thirdSet?.weight || 0, reps: Number(e.target.value) }}/>
        </TableCell>
        <TableCell>
          <TextField slotProps={{ htmlInput: HtmlInputProps }} onChange={(e) => exerciseRef.fourthSet = { weight: Number(e.target.value), reps: exerciseRef.fourthSet?.reps || 0 }}/>
        </TableCell>
        <TableCell>
          <TextField slotProps={{ htmlInput: HtmlInputProps }} onChange={(e) => exerciseRef.fourthSet = { weight: exerciseRef.fourthSet?.weight || 0, reps: Number(e.target.value) }}/>
        </TableCell>
      </TableRow>
      {open && <ExerciseHistory exercise={exercise} handleClose={() => setOpen(false)}/>}
    </>
  )
}

export default ExerciseRow;