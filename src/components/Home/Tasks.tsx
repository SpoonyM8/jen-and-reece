import { FC, useEffect, useState } from "react";
import useFetchTasks from "../../hooks/fetch/useFetchTasks";

import { List, Typography } from "@mui/material";
import NewTask from "./NewTask";
import { Task } from "../../types";
import TaskComponent from "./Task";

type TasksProps = {
  categoryId?: number | null;
}
const Tasks: FC<TasksProps> = ({ categoryId }) => {
  const { data, fetchData } = useFetchTasks(categoryId)
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (categoryId) fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId])

  useEffect(() => {
    if (data) setTasks(data)
  }, [data])

  const onCreateTask = (newTask: Task) => {
    setTasks([
      newTask,
      ...tasks
    ])
  }

  const onEditTask = (newTask: Task) => {
    const newTasks: Task[] = [];
    tasks.forEach(task => {
      if (task.id === newTask.id) {
        newTasks.push(newTask);
      } else {
        newTasks.push(task);
      }
    });
    setTasks(newTasks)
  }

  const onDeleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  }

  if (categoryId === null) {
    return (
        <Typography variant="h6" color="text.secondary" sx={{ textAlign: "center", mt: 2 }}>
          Click a category to see its tasks
        </Typography>
    );
  }

  return (
      <List>
        { categoryId && <NewTask categoryId={categoryId} onAddNewTask={onCreateTask}/> }
        {tasks ? tasks.map((task) => <TaskComponent task={task} onEdit={onEditTask} onDelete={onDeleteTask}/>)
        :
        <Typography variant="h6" color="text.secondary" sx={{ textAlign: "center", mt: 2 }}>
          No tasks available
        </Typography>
        }
      </List>
  )

};

export default Tasks;