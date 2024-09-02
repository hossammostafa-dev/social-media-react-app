import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
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
import axios from "axios";

const Register = () => {
  const [registerForm, setregisterForm] = useState({
    username: "",
    name: "",
    email: "",
    image: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [openalert, setOpenAlert] = useState({ show: false, message: "" });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();

  // start the request
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("username", registerForm.username);
    formData.append("name", registerForm.name);
    formData.append("email", registerForm.email);
    formData.append("image", selectedFile);
    formData.append("password", registerForm.password);

    try {
      const response = await axios.post(
        "https://tarmeezacademy.com/api/v1/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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
    }
  };

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
              top: "40%",
              right: "45%",
              zIndex: "1111",
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
          }}
        >
          <Typography
            sx={{ mt: 2, ml: 2 }}
            fontWeight={"bold"}
            variant="h4"
            gutterBottom
          >
            Create a new account
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
                value={registerForm.username}
                onChange={(event) => {
                  setregisterForm({
                    ...registerForm,
                    username: event.target.value,
                  });
                }}
              />

              <TextField
                required
                id="outlined-required"
                label="Name"
                value={registerForm.name}
                onChange={(event) => {
                  setregisterForm({
                    ...registerForm,
                    name: event.target.value,
                  });
                }}
              />

              <TextField
                required
                id="outlined-required"
                label="Email"
                value={registerForm.email}
                onChange={(event) => {
                  setregisterForm({
                    ...registerForm,
                    email: event.target.value,
                  });
                }}
              />
              <Typography mb={0} fontSize={"15px"} variant="body3">
                Picture of the profile
              </Typography>
              <TextField
                type="file"
                required
                id="outlined-required"
                onChange={handleFileChange}
              />

              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  value={registerForm.password}
                  onChange={(event) => {
                    setregisterForm({
                      ...registerForm,
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
                Create
              </Button>

              <Button
                onClick={() => {
                  navigate("/login");
                }}
                sx={{ borderRadius: 4, textTransform: "capitalize" }}
                variant="outlined"
              >
                Login
              </Button>
            </form>
          </Stack>
        </Box>
      </Container>
    </>
  );
};
export default Register;
