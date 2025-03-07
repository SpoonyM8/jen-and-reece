import { IconButton, ListItem, TextField } from "@mui/material";
import { FC, useRef, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import MinusIcon from '@mui/icons-material/Minimize';
import CheckIcon from '@mui/icons-material/Check'
import useFetchTasks from "../../hooks/fetch/useFetchTasks";
import { Task } from "../../types";

type NewTaskProps = {
  categoryId: number;
  onAddNewTask: (task: Task) => void;
}
const NewTask: FC<NewTaskProps> = ({ onAddNewTask, categoryId }) => {
  const [expanded, setExpanded] = useState(false);
  const { fetchData } = useFetchTasks();
  const textFieldRef = useRef('');

  const onAdd = async () => {
    const res = await fetchData({
      method: 'POST',
      body: JSON.stringify({ categoryId, description: textFieldRef.current })
    })
    onAddNewTask({
      id: Number(res.id),
      description: textFieldRef.current,
      categoryId: categoryId
    });
    setExpanded(false);
    textFieldRef.current = '';
  }
  
  return (
    <>
      <ListItem sx={{justifyContent: 'center'}}>
        <IconButton onClick={() => setExpanded(!expanded)}>
          {expanded ? <MinusIcon /> : <AddIcon />} 
        </IconButton>
      </ListItem>
      <ListItem>
        {expanded && (
          <>
            <TextField fullWidth size='small' autoFocus onChange={(e) => textFieldRef.current = e.target.value}/>
            <IconButton edge='end'>
              <CheckIcon onClick={() => onAdd()}/>
            </IconButton>
          </>
        )}
      </ListItem>
    </>
  )
}

export default NewTask;