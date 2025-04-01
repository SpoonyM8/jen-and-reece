import { Box, Button, IconButton, ListItem, ListItemText, Modal, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useRef, useState } from 'react';
import { Exercise } from '../../hooks/fetch/types';
import NewExercise from './NewExercise';
import useFetchWorkouts from '../../hooks/fetch/useFetchWorkouts';

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

type WorkoutCreatorProps = {
  exercises: Exercise[];
}
const WorkoutCreator: React.FC<WorkoutCreatorProps> = ({ exercises }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedList, setSelectedList] = useState<Exercise[]>([]);
  const workoutNameRef = useRef('');
  const { fetchData: createWorkout } = useFetchWorkouts();

  const onClose = () => {
    setIsCreating(false);
  }

  const addExerciseToList = (exercise: Exercise) => {
    setSelectedList([...selectedList, exercise]);
  }

  const removeExerciseFromList = (exerciseId: number) => {
    setSelectedList(selectedList.filter(ex => ex.id !== exerciseId));
  }

  const handleSubmit = () => {
    createWorkout({
      method: 'POST',
      body: JSON.stringify(({
        name: workoutNameRef.current,
        exerciseIds: selectedList.map(exercise => exercise.id)
      }))
    })
    setIsCreating(false);
  }

  useEffect(() => {
    if (!isCreating) setSelectedList([]);
  }, [isCreating])

  return (
    <>
    <IconButton onClick={() => setIsCreating(true)}>
      <AddIcon color="success"/>      
    </IconButton>
    {isCreating && 
      <Modal
      open={isCreating}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
        <Box sx={style}>
          <TextField
          autoFocus
          onChange={(e) => workoutNameRef.current = e.target.value}
          />
          <NewExercise exercises={exercises} onAddNewExercise={addExerciseToList} alwaysExpanded/>
          {selectedList?.map(exercise => {
            return (
              <ListItem key={exercise.name}>
                <ListItemText disableTypography primary={<Typography color="info">{exercise.name}</Typography>} sx={{ textAlign: 'center' }} />
                <IconButton onClick={() => removeExerciseFromList(exercise.id)}>
                  <DeleteIcon color="error"/>
                </IconButton>
              </ListItem>
            )
          })}
          <Button onClick={handleSubmit}>CREATE!!</Button>
        </Box>
      </Modal>
    }
    </>
  )
}

export default WorkoutCreator;