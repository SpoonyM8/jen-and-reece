import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

type BackdropSpinnerProps = {
  shouldOpen: boolean;
}
const BackdropSpinner: React.FC<BackdropSpinnerProps> = ({ shouldOpen }) => {
  return (
    <Backdrop
    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
    open={shouldOpen}
    onClick={() => {}}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
  )
}

export default BackdropSpinner;