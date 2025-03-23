import { Link } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

export default function ButtonAppBar() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar sx={{ justifyContent: 'center', gap: '20px' }}>
          <Link href="/home" color='secondary' variant='h6'>
            Todo List
          </Link>
          <Link href="/gym" color='error' variant='h6'>
            Gym Tracker
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
