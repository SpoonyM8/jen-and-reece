import { IconButton, ListItem, TextField } from "@mui/material";
import { FC, useRef, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import MinusIcon from '@mui/icons-material/Minimize';
import CheckIcon from '@mui/icons-material/Check'
import useFetchCategories from "../../hooks/fetch/useFetchCategories";

type NewItemProps = {
  onAddNewItem: (id: number, name: string) => void;
}
const NewItem: FC<NewItemProps> = ({ onAddNewItem }) => {
  const [expanded, setExpanded] = useState(false);
  const { fetchData } = useFetchCategories();
  const textFieldRef = useRef('');

  const onAdd = async () => {
    const res = await fetchData({
      method: 'POST',
      body: JSON.stringify({ name: textFieldRef.current })
    })
    onAddNewItem(res.id, textFieldRef.current);
    setExpanded(false);
    textFieldRef.current = '';
  }
  
  return (
    <>
      <ListItem>
        <IconButton onClick={() => setExpanded(!expanded)}>
          {expanded ? <MinusIcon /> : <AddIcon />} 
        </IconButton>
      </ListItem>
      <ListItem>
        {expanded && (
          <>
            <TextField size='small' autoFocus onChange={(e) => textFieldRef.current = e.target.value}/>
            <IconButton>
              <CheckIcon onClick={() => onAdd()}/>
            </IconButton>
          </>
        )}
      </ListItem>
    </>
  )
}

export default NewItem;