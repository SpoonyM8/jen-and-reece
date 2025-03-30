import { useRef, useState } from "react";
import { Exercise } from "../../hooks/fetch/types";
import useFetchExercises from "../../hooks/fetch/useFetchExercises";
import { IconButton, ListItem, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import MinusIcon from '@mui/icons-material/Minimize';
import CheckIcon from '@mui/icons-material/Check'

type NewExerciseProps = {
  onAddNewExercise: (exercise: Exercise) => void;
}
const NewExercise: React.FC<NewExerciseProps> = ({ onAddNewExercise }) => {
  const [expanded, setExpanded] = useState(false);
  const { fetchData } = useFetchExercises();
  const textFieldRef = useRef('');

  const onAdd = async () => {
    const res = await fetchData({
      method: 'POST',
      body: JSON.stringify({ name: textFieldRef.current })
    })
    onAddNewExercise({
      id: Number(res.id),
      name: textFieldRef.current
    });
    setExpanded(false);
    textFieldRef.current = '';
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
            <TextField fullWidth size='small' autoFocus onChange={(e) => textFieldRef.current = e.target.value}/>
            <IconButton edge='end' size='small'>
              <CheckIcon onClick={() => onAdd()} color="success"/>
            </IconButton>
          </>
        )}
      </ListItem>
    </>
  )
}

export default NewExercise;