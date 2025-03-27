import { useEffect, useState } from "react"
import { BASE_API_URL } from "../../consts"
import { Exercise, ExerciseLogResponse } from "../../hooks/fetch/types"
import useFetch from "../../hooks/fetch/useFetch"
import { Box, Button, Modal, Typography } from "@mui/material"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  textAlign: 'center',
  flexDirection: 'column'
};

type ExerciseHistoryProps = {
  exercise: Exercise;
  handleClose: () => void;
}
const ExerciseHistory: React.FC<ExerciseHistoryProps> = ({ exercise, handleClose }) => {
  const { data, fetchData } = useFetch<ExerciseLogResponse[]>(`${BASE_API_URL}/exercise/log/${exercise.id}`);

  useEffect(() => {
    fetchData()
  }, []);

  const getSetString = (exerciseLog: ExerciseLogResponse) => {
    const first =`${exerciseLog.firstSet.weight},${exerciseLog.firstSet.reps}`;
    const second = !exerciseLog.secondSet ? '' : ` | ${exerciseLog.secondSet.weight},${exerciseLog.secondSet.reps}`;
    const third = !exerciseLog.thirdSet ? '' : ` | ${exerciseLog.thirdSet.weight},${exerciseLog.thirdSet.reps}`;
    const fourth = !exerciseLog.fourthSet ? '' : ` | ${exerciseLog.fourthSet.weight},${exerciseLog.fourthSet.reps}`;
    return first + second + third + fourth;
  }
  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {data && data.map(exerciseLog => {
          return (
            <>
              <Typography color='info' alignSelf='center'>{getSetString(exerciseLog)}</Typography>
            </>
          )
        })}
      </Box>
    </Modal>
  );
}

export default ExerciseHistory;