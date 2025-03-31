import { Box, IconButton, ListItem, ListItemText, Modal, Typography } from "@mui/material";
import { Exercise, Workout } from "../../hooks/fetch/types"
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { areArraysEqual } from "../../util/helpers";
import useFetchWorkouts from "../../hooks/fetch/useFetchWorkouts";
import NewExercise from "./NewExercise";

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
  exercises: Exercise[];
}
const WorkoutEditor: React.FC<WorkoutEditorProps> = ({ workout, exercises: exerciseData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [exercises, setExercises] = useState(workout.exercises);
  const { fetchData: updateWorkoutTemplate } = useFetchWorkouts();

  const onDeleteExercise = (exerciseId: number) => {
    setExercises(exercises.filter(exercise => exercise.id !== exerciseId))
  }

  const onClose = () => {
    if (!areArraysEqual(workout.exercises, exercises)) {
      updateWorkoutTemplate({
        method: 'PATCH',
        body: JSON.stringify({
          id: workout.id,
          name: workout.name,
          exerciseIds: exercises.map(exercise => exercise.id)
        })
      })
    }
    setIsEditing(false)
  }

  const onAddNewExercise = (exercise: Exercise) => {
    setExercises([...exercises, exercise])
  }

  return (
    <>
      {
        <>
          <ListItem key={workout.id}>
            <ListItemText sx={{ textAlign: 'center' }} primary={workout.name} onClick={() => setIsEditing(true)} />
          </ListItem> 
          <Modal
          open={isEditing}
          onClose={onClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <NewExercise exercises={exerciseData} onAddNewExercise={onAddNewExercise}/>
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