import { useEffect, useState } from "react";
import { Grid, IconButton, List, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useFetchCategories from "../../hooks/fetch/useFetchCategories";
import Tasks from "./Tasks";
import NewItem from "./NewItem";
import { Category } from "../../types";
import CategoryComponent from "./Category";

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const { data, fetchData } = useFetchCategories();
  const [categories, setCategories] = useState<Category[]>([]);
  const { fetchData: deleteData } = useFetchCategories();

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) setCategories(data);
  }, [data])

  const handleDeleteCategory = (id: number) => {
    deleteData({ 
      method: 'DELETE',
      body: JSON.stringify({ id })
    });
    if (id === activeCategory) setActiveCategory(null);
    setCategories(categories.filter(category => category.id !== id))
  }

  const onAddNewItem = (id: number, name: string) => {
    setCategories([{
      id,
      name
    }].concat(categories))
  }

  const onEditCategory = (category: Category) => {
    const newCategories: Category[] = []
    categories.forEach(existingCategory => {
      if (existingCategory.id === category.id) {
        newCategories.push(category);
      } else {
        newCategories.push(existingCategory);
      }
    });
    setCategories(newCategories);
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
          <NewItem onAddNewItem={onAddNewItem}/>
          {categories?.map((category) => (
            <CategoryComponent category={category} onCategoryClick={() => setActiveCategory(category.id)} onDeleteClick={() => handleDeleteCategory(category.id)} onEditCategory={onEditCategory}/>
          ))}
        </List>
      </Grid>
      <Tasks categoryId={activeCategory} />
    </Grid>
  );
};

export default Categories;
