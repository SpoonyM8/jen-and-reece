import { useEffect, useState } from "react";
import { Grid, List, Typography } from "@mui/material";
import useFetchCategories from "../../hooks/fetch/useFetchCategories";
import Tasks from "./Tasks";
import NewCategory from "./NewCategory";
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

  const onAddNewCategory = (id: number, name: string) => {
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

  const onCategoryClick = (categoryId: number) => {
    setActiveCategory(categoryId);

  }

  return (
    <Grid
      container
      justifyContent="center"
      position='absolute'
      top='25%'
      overflow="visible"
      spacing={0}
    >
      <Grid item xs={6} sm={3}>
        <Typography variant="h5">
          Categories
        </Typography>
        <List>
          <NewCategory onAddNewCategory={onAddNewCategory} />
          {categories?.map((category) => (
            <CategoryComponent key={category.id + category.name} isActive={activeCategory === category.id} category={category} onCategoryClick={() => onCategoryClick(category.id)} onDeleteClick={() => handleDeleteCategory(category.id)} onEditCategory={onEditCategory}/>
          ))}
        </List>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Typography variant="h5">
          Tasks
        </Typography>
        <Tasks categoryId={activeCategory} />
      </Grid>

    </Grid>
  );
};

export default Categories;
