import {
  Alert,
  Box,
  CircularProgress,
  Fab,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import { Fragment } from "react";

const style = {
  position: "absolute", 
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const CreatePost = () => {
  const [dataPost, setDataPost] = useState({ title: "", body: "" });
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openalert, setOpenAlert] = useState({ show: false, message: "" });

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("title", dataPost.title);
    formData.append("body", dataPost.body);
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "https://tarmeezacademy.com/api/v1/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response:", response.data);
      setIsLoading(false);
      setOpen(false);
      location.reload();
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
      setOpenAlert({ show: true, message: error.response.data.message});
    } 
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClosealert = (reason) => {
    if (reason === "clickaway") {
      return;
    };

    setOpenAlert(false);
  };

  return (
    <>
      <Fab
        onClick={handleOpen}
        sx={{ position: "fixed", top: "85%", right: "10px" }}
        color="primary"
        aria-label="add"
      >
        <CreateIcon />
      </Fab>

      <Fragment>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Paper
            sx={{
              ...style,
              width: { xs: "90%", md: "40%" },
              height: { xs: "80%", md: "80%" },
              border: "none",
              borderRadius: "2%",
            }}
          >
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
                  width: "90%",
                  height: "80%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "fixed",
                  zIndex:'9999'
                }}
              >
                <CircularProgress />
              </Box>
            ) : null}

            <Typography
              color={"primary"}
              mt={3}
              variant="h4"
              fontWeight={"bold"}
            >
              Crear a New Post
            </Typography>
            <hr
              style={{
                width: "25%",
                height: "3px",
                position: "absolute",
                background: "#1565c0",
              }}
            />
            <Stack mt={5} gap={3} justifyContent={"center"}>
              <TextField
                required
                id="outlined-required"
                label="Title"
                value={dataPost.title}
                onChange={(event) => {
                  setDataPost({ ...dataPost, title: event.target.value });
                }}
              />

              <TextField
                required
                id="outlined-required"
                label="Body"
                value={dataPost.body}
                onChange={(event) => {
                  setDataPost({ ...dataPost, body: event.target.value });
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
            </Stack>
            <Button
              variant="contained"
              sx={{ mt: 4 }}
              onClick={() => {
                handleSubmit();
              }}
            >
              Create posta
            </Button>
          </Paper>
        </Modal>
      </Fragment>
    </>
  );
};
export default CreatePost;
