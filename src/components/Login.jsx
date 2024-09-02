import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import axios from "axios";

const Login = () => {
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [openalert, setOpenAlert] = useState({ show: false, message: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  //start the requect
  const handleSubmit = async () => {
    setIsLoading(true);
    const params = {
      username: loginForm.username,
      password: loginForm.password,
    };

    try {
      const response = await axios.post(
        "https://tarmeezacademy.com/api/v1/login",
        params
      );
      console.log("Response:", response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setIsLoading(false);
      function handleClick() {
        navigate("/home");
      }
      handleClick();
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
      setOpenAlert({ show: true, message: error.response.data.message });
    } finally {
      //setIsLoading(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClosealert = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <>
      <Container sx={{ p: 2 }} maxWidth="sm">
        <div>
          <Snackbar
            open={openalert.show}
            autoHideDuration={3000}
            onClose={handleClosealert}
            sx={{
              height: "12%",
              width: "90%",
              top: "2%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Alert severity="error" variant="filled" sx={{ width: "90%" }}>
              {openalert.message}
            </Alert>
          </Snackbar>
        </div>

        {isLoading ? (
          <Box
            sx={{
              width: "10%",
              height: "10%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "fixed",
              top: "20%",
              right: "45%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : null}

        <Box
          sx={{
            bgcolor: "#fafcf5",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            borderRadius: "10px",
          }}
        >
          <Typography
            sx={{ mt: 2, ml: 3 }}
            fontWeight={"bold"}
            variant="h4"
            gutterBottom
          >
            Login
          </Typography>
          <span
            style={{
              width: "100px",
              height: "3px",
              background: "#1e88e5",
              marginLeft: "20px",
            }}
          />

          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ height: "80vh" }}
          >
            <form
              style={{
                padding: "10px",
                height: "90%",
                width: "90%",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                justifyContent: "center",
              }}
            >
              <TextField
                required
                id="outlined-required"
                label="UserName"
                value={loginForm.username}
                onChange={(event) => {
                  setLoginForm({ ...loginForm, username: event.target.value });
                }}
              />

              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  value={loginForm.password}
                  onChange={(event) => {
                    setLoginForm({
                      ...loginForm,
                      password: event.target.value,
                    });
                  }}
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  }
                  label="Password"
                />
              </FormControl>

              <Button
                onClick={() => {
                  handleSubmit();
                }}
                sx={{ borderRadius: 4, textTransform: "capitalize" }}
                variant="contained"
              >
                Login
              </Button>

              <Button
                onClick={() => {
                  navigate("/register");
                }}
                sx={{ borderRadius: 4, textTransform: "capitalize" }}
                variant="outlined"
              >
                Create a new account
              </Button>
            </form>
          </Stack>
        </Box>
      </Container>
    </>
  );
};
export default Login;
