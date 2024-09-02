/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Modal,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
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


const UpdatePost = ({ open, postId, handleClose, postBody, postTitle }) => {
  const [valueInput, setValueInput] = useState({
    title: postTitle,
    body: postBody,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [openalert, setOpenAlert] = useState({ show: false, message: "" });

  const handleUpdate = async () => {
    setIsLoading(true);

    const token = localStorage.getItem("token");
    let data = {
      title: valueInput.title,
      body: valueInput.body,
    };

    try {
      const response = await axios.put(
        `https://tarmeezacademy.com/api/v1/posts/${postId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Data updated successfully:", response.data);
      setIsLoading(false);
      handleClose();
      location.reload();
    } catch (error) {
      console.error("Error updating data:", error);
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
              Update This Post{" "}
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
                value={valueInput.title}
                onChange={(event) => {
                  setValueInput({ ...valueInput, title: event.target.value });
                }}
              />

              <TextField
                required
                id="outlined-required"
                label="Body"
                value={valueInput.body}
                onChange={(event) => {
                  setValueInput({ ...valueInput, body: event.target.value });
                }}
              />

              <Typography mb={0} fontSize={"15px"} variant="body3">
                Update Picture of the profile
              </Typography>
              <TextField
                type="file"
                required
                id="outlined-required"
                //onChange={handleFileChange}
              />
            </Stack>
            <Button
              variant="contained"
              sx={{ mt: 4 }}
              onClick={() => {
                handleUpdate();
              }}
            >
              Update
            </Button>
          </Paper>
        </Modal>
      </Fragment>
    </>
  );
};
export default UpdatePost;
