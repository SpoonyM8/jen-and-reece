import { Link } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

export default function NavBar() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar sx={{ justifyContent: 'center', gap: '20px' }}>
          <Link href="/home" color='secondary' variant='h6'>
            Todo List
          </Link>
          <Link href="/gym" color='secondary' variant='h6'>
            Gym Tracker
          </Link>
          <Link href="/manage_exercises" color="secondary" variant="h6">
            Manage Exercises
          </Link>
          <Link href="/manage_workouts" color="secondary" variant="h6">
            Manage Workouts
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
