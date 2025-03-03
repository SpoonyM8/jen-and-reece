import { IconButton, ListItem, ListItemText, TextField } from "@mui/material";
import { FC, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { Task } from "../../types";
import useFetchTasks from "../../hooks/fetch/useFetchTasks";

type TaskProps = {
  task: Task
  onEdit: (newTask: Task) => void;
  onDelete: (taskId: number) => void;
}
const TaskComponent: FC<TaskProps> = ({ task, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const { fetchData } = useFetchTasks();

  const onEditClick = () => {
    setIsEditing(!isEditing);

    if (isEditing) {
      const newTask = {
        id: task.id,
        categoryId: task.categoryId,
        description: newTaskDescription
      }
      onEdit(newTask);
      fetchData({
        method: 'PATCH',
        body: JSON.stringify(newTask)
      });
    }
  }

  const onDeleteClick = () => {
    fetchData({
      method: 'DELETE',
      body: JSON.stringify({
        categoryId: task.categoryId,
        id: task.id
      })
    });
    onDelete(task.id)
  }

  return (
    <ListItem key={task.categoryId + ':' + task.id}>
      { isEditing ? <TextField
        fullWidth autoFocus
        value={ newTaskDescription || task.description }
        onChange={(e) => setNewTaskDescription(e.target.value)} 
        />
        :
        <ListItemText primary={task.description} sx={{ textAlign: 'center' }}/>
      }
      <IconButton onClick={onEditClick}>
        { isEditing ? <CheckIcon /> : <EditIcon />  }
      </IconButton>
      <IconButton onClick={onDeleteClick} edge='end'>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}

export default TaskComponent;