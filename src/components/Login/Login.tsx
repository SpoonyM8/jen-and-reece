import { Container, TextField, Button, Paper, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import { BASE_API_URL } from "../../consts";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {data, fetchData } = useFetch(`${BASE_API_URL}/login`, { method: 'POST' });

  const onSubmit = (data) => {
    fetchData({
      body: JSON.stringify(data)
    })
    console.log("Login Data:", data);
  };

  useEffect(() => {
    if (data) console.log(data);
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
    </Container>
  );
};

export default Login;