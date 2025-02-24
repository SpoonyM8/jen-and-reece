import { FC, ReactNode, useEffect } from "react";
import useFetchTasks from "../../hooks/fetch/useFetchTasks";
import { Box, Card, Divider, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";

type TasksWrapperProps = {
  children: ReactNode
}
const TasksWrapper: FC<TasksWrapperProps> = ({ children }) => {
  return (
    <Grid item xs={12} sm={3}>
      {children}
    </Grid>
  )
}

type TasksProps = {
  categoryId: number | null;
}
const Tasks: FC<TasksProps> = ({ categoryId }) => {
  const { data, fetchData } = useFetchTasks(categoryId)

  useEffect(() => {
    if (categoryId) fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId])


  if (categoryId === null) {
    return (
      <TasksWrapper>
        <Typography variant="h6" color="text.secondary" sx={{ textAlign: "center", mt: 2 }}>
          Click a category to see its tasks
        </Typography>
      </TasksWrapper>
    );
  }

  if (!data || data.length === 0) {
    return (
      <TasksWrapper>
        <Typography variant="h6" color="text.secondary" sx={{ textAlign: "center", mt: 2 }}>
          No tasks available.
        </Typography>
      </TasksWrapper>
    );
  }

  return (
    <TasksWrapper>
            <List>
              {data && data.map((task) => (
                  <ListItem key={task.id}>
                    <ListItemText primary={task.description} sx={{ textAlign: 'center' }}/>
                  </ListItem>
                ))}
              </List>
      </TasksWrapper>
  )
  /*
  return (
    <TasksWrapper>
      <List>
        {data && data.map((task, index) => (
          <Box key={task.id}>
            <ListItem
              sx={{
                borderRadius: 1,
                "&:hover": { bgcolor: "primary.light", color: "white" },
                transition: "0.3s",
              }}
            >
              <ListItemText primary={task.description} sx={{ fontSize: "1rem" }} />
            </ListItem>
            {index < data.length - 1 && <Divider />}
          </Box>
        ))}
      </List>
    </TasksWrapper>
  );
  */
};

export default Tasks;