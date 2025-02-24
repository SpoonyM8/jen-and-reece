import { useEffect, useRef, useState } from "react";
import { Box, Card, Container, Divider, Grid, IconButton, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import useFetchCategories from "../../hooks/fetch/useFetchCategories";
import Tasks from "./Tasks";

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const { data, fetchData } = useFetchCategories();
  const { fetchData: deleteData } = useFetchCategories();
  const deletedTasks = useRef<Array<number>>([]);

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteCategory = (id: number) => {
    deleteData({ 
      method: 'DELETE',
      body: JSON.stringify({ id })
    })
    if (id === activeCategory) setActiveCategory(null);
    deletedTasks.current = deletedTasks.current.concat(id);
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh', wordWrap: 'break-word' }}
      spacing={12}
    >
      <Grid item xs={12} sm={3}>
        <List>
          {data?.filter(category => !deletedTasks.current.includes(category.id)).map((category) => (
            <ListItem  key={category.id} >
              <ListItemText primary={category.name} onClick={() => setActiveCategory(category.id)} sx={{ textAlign: 'center' }}/>
              <IconButton onClick={() => handleDeleteCategory(category.id)} edge='end'>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Grid>
      { <Tasks categoryId={activeCategory} /> }
    </Grid>
  );
};

/*
        
          
*/

export default Categories;
