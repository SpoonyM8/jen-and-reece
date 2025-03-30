import { Box, IconButton, ListItem, ListItemText, Modal, Typography } from "@mui/material";
import { Workout } from "../../hooks/fetch/types"
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '320px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  textAlign: 'center',
  flexDirection: 'column',
  maxWidth: 'sm'
};

type WorkoutEditorProps = {
  workout: Workout;
}
const WorkoutEditor: React.FC<WorkoutEditorProps> = ({ workout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [exercises, setExercises] = useState(workout.exercises);

  const onDeleteExercise = (exerciseId: number) => {
    setExercises(exercises.filter(exercise => exercise.id !== exerciseId))
  }

  return (
    <>
      {
        <>
          <ListItem key={workout.id}>
            <ListItemText primary={workout.name} onClick={() => setIsEditing(true)} />
          </ListItem> 
          <Modal
          open={isEditing}
          onClose={() => setIsEditing(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {
                exercises.map(exercise => {
                  return (
                    <ListItem key={exercise.name}>
                      <ListItemText disableTypography primary={<Typography color="info">{exercise.name}</Typography>} sx={{ textAlign: 'center' }} />
                      <IconButton onClick={() => onDeleteExercise(exercise.id)}>
                        <DeleteIcon color="error"/>
                      </IconButton>
                    </ListItem>
                  )
                })
              }
              </Box>
          </Modal>
        </>
      }
    </>
  )
}

export default WorkoutEditor;