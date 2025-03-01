import { Container, TextField, Button, Paper, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import BackdropSpinner from "../BackdropSpinner";
import { useAuthContext } from "../../context/AuthContext";
import useFetchLogin from "../../hooks/fetch/useFetchLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setToken } = useAuthContext();
  const {data, loading, fetchData } = useFetchLogin();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    fetchData({
      body: JSON.stringify(data)
    });
  };

  useEffect(() => {
    if (data) {
      setToken(data.token)
      navigate('/home');
    }
  }, [data])

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 3 }}>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("password", {
              required: "Password is required",
            })}
            error={!!errors.password}
            helperText={errors.password?.message as string}
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Box>
        </form>
      </Paper>
      <BackdropSpinner shouldOpen={loading} />
    </Container>
  );
};

export default Login;