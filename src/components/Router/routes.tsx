import Login from "../Login/Login";
import Home from "../Home/Home";
import GymTracker from "../GymTracker/GymTracker";
import ExerciseManager from "../ExerciseManager/ExerciseManager";
import WorkoutTemplateManager from "../WorkoutTemplateManager/WorkoutTemplateManager";

export const unprotectedRoutes = [
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/login',
    element: <Login />
  },
];

export const protectedRoutes = [
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/gym',
    element: <GymTracker />
  },
  {
    path: '/manage_exercises',
    element: <ExerciseManager />
  },
  {
    path: '/manage_workouts',
    element: <WorkoutTemplateManager />
  }
];
