import { IconButton, ListItem, ListItemText, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { FC, useState } from "react";
import { Category } from "../../types";
import useFetchCategories from "../../hooks/fetch/useFetchCategories";

type CategoryProps = {
  category: Category;
  onCategoryClick: () => void;
  onDeleteClick: () => void;
  onEditCategory: (category: Category) => void;
  isActive: boolean;
}
const CategoryComponent: FC<CategoryProps> = ({ category, onCategoryClick, onDeleteClick, onEditCategory, isActive }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState(category.name);
  const { fetchData } = useFetchCategories();

  const onEditClick = () => {
    setIsEditing(!isEditing);
    
    if (isEditing) {
      const newCategory = {
        id: category.id,
        name: newCategoryName
      }
      onEditCategory(newCategory);
      fetchData({
        method: 'PATCH',
        body: JSON.stringify(newCategory)
      });
    }

  };

  return (
    <>
      <ListItem  key={category.id}>
        { isEditing ? <TextField 
            fullWidth autoFocus 
            value={ newCategoryName || category.name }
            onChange={(e) => setNewCategoryName(e.target.value)}
            /> 
          : 
          <ListItemText primary={category.name} slotProps={{primary: { fontWeight: isActive ? 'bold' : 'normal'}}} onClick={onCategoryClick} sx={{ textAlign: 'center', wordWrap: 'break-word' }}/> }
        <IconButton onClick={() => onEditClick()} edge="end">
          { isEditing ? <CheckIcon color="success" /> : <EditIcon color="warning" /> }
        </IconButton>
        <IconButton onClick={onDeleteClick} edge='end'>
          <DeleteIcon color="error"/>
        </IconButton>
      </ListItem>
    </>
  )
}

export default CategoryComponent;