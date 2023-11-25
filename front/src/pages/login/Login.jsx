import React from "react";
import axiosM from "./../../utils/axiosM";
import { AuthContext } from "../../context/AuthContext";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Paper,
  TextField,
  Button,
  Snackbar,
  Alert,
  Slide,
} from "@mui/material";

import styles from "./Login.module.css";

export const Login = () => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const { loading, error, dispatchAuth } = React.useContext(AuthContext);

  function SlideTransition(props) {
    return <Slide {...props} direction="down" />;
  }

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      username: "Sergiu",
      password: "12345",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data, e) => {
    dispatchAuth({ type: "login_start" });
    try {
      const res = await axiosM.post("/api/auth/login", data);
      dispatchAuth({ type: "login_success", payload: res.data });
      navigate(-1);
    } catch (error) {
      dispatchAuth({ type: "login_fail", payload: error.response.data });
    }
  };

  const onError = (errors, e) => {
    console.log(errors, e);
  };

  const handleClose = (event, reason) => {
    // if (reason === "clickaway") {
    //   return;
    // }

    setOpen(false);
  };

  React.useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
      >
        <Alert elevation={16} variant="filled" severity="error">
          Username or Password is incorect.
        </Alert>
      </Snackbar>
      <Paper classes={{ root: styles.root }}>
        <Typography
          sx={{ textAlign: "center", fontWeight: "bold", marginBottom: "30px" }}
          variant="h5"
        >
          Log in to account
        </Typography>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <TextField
            sx={{
              marginBottom: "20px",
            }}
            placeholder="Tap your username"
            label="Username"
            error={Boolean(errors.username?.message)}
            helperText={errors.username?.message}
            fullWidth
            {...register("username", {
              required: { value: true, message: "Username missing" },
            })}
          />
          <TextField
            sx={{
              marginBottom: "20px",
            }}
            placeholder="Tap your password"
            label="Password"
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            fullWidth
            {...register("password", {
              required: { value: true, message: "Password missing" },
              minLength: { value: 5, message: "Password too short" },
            })}
          />
          <Button
            disabled={loading}
            type="submit"
            size="large"
            variant="contained"
            fullWidth
          >
            Log in
          </Button>
        </form>
      </Paper>
    </>
  );
};
