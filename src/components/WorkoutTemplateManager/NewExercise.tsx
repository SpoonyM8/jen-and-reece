import { useRef, useState } from "react";
import { Exercise } from "../../hooks/fetch/types"
import { IconButton, ListItem, MenuItem, Select } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import MinusIcon from '@mui/icons-material/Minimize';
import CheckIcon from '@mui/icons-material/Check'

type NewExerciseProps = {
  exercises: Exercise[];
  onAddNewExercise: (exercise: Exercise) => void;
}
const NewExercise: React.FC<NewExerciseProps> = ({ exercises, onAddNewExercise }) => {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<Exercise>();

  const onAdd = async () => {
    onAddNewExercise({
      id: selected?.id as number,
      name: selected?.name as string
    });
    setExpanded(false);
  }
  
  return (
    <>
      <ListItem sx={{justifyContent: 'center'}}>
        <IconButton onClick={() => setExpanded(!expanded)}>
          {expanded ? <MinusIcon color="info"/> : <AddIcon color="info"/>} 
        </IconButton>
      </ListItem>
      <ListItem sx={{justifyContent: 'center' }}>
        {expanded && (
          <>
            <Select onChange={(e) => {
              setSelected({
                id: e.target.value as number,
                name: exercises.find(exercise => exercise.id === e.target.value)?.name as string
              })
            }}>
              {
                exercises.map(exercise => 
                  <MenuItem key={exercise.id} value={exercise.id}>
                    {exercise.name}
                  </MenuItem>
                )
              }
            </Select>
            <IconButton onClick={onAdd} edge='end' size='small'>
              <CheckIcon color="success"/>
            </IconButton>
          </>
        )}
      </ListItem>
    </>
  )
}

export default NewExercise;