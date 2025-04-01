import { useState } from "react";
import { Exercise } from "../../hooks/fetch/types";
import { IconButton, ListItem, ListItemText, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import useFetchExercises from "../../hooks/fetch/useFetchExercises";

type EditableExerciseProps = {
  exercise: Exercise;
}
const EditableExercise: React.FC<EditableExerciseProps> = ({ exercise }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(exercise.name);
  const { fetchData } = useFetchExercises();
  
  const onEditClick = () => {
    setIsEditing(!isEditing);

    if (isEditing) {
      fetchData({
        method: 'PATCH',
        body: JSON.stringify({
          id: exercise.id,
          name: newName
        })
      });
    }
  }

  return (
    <ListItem key={exercise.id}>
      {
        isEditing ? <TextField
        autoFocus
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        />
        :
        <ListItemText primary={newName} sx={{ textAlign: 'center' }} />
      }
      <IconButton onClick={onEditClick} edge="end">
      { isEditing ? <CheckIcon color="success"/> : <EditIcon color="warning"/>  }
      </IconButton>
    </ListItem>
  )
}

export default EditableExercise;