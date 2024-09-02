/* eslint-disable react/prop-types */
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Modal,
  Paper,
  Snackbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
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


const DeletePost = ({ postId, open, handleClose }) => {
  const [openalert, setOpenAlert] = useState({ show: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const confirmDeletePost = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(
        `https://tarmeezacademy.com/api/v1/posts/${postId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response:", response.data);
      setIsLoading(false);
      handleClose();
      location.reload()
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
      setOpenAlert({ show: true, message: error.response.data.message  });
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
              height: { xs: "30%", md: "30%" },
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
                  width: "85%",
                  height: "30%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "fixed",
                  zIndex: "1",
                  top: "2",
                }}
              >
                <CircularProgress />
              </Box>
            ) : null}

            <Typography mt={3} variant="h5" fontWeight={"bold"}>
              Are you sure to delete this post ?
            </Typography>

            <Box mt={3} textAlign={"center"}>
              <Button
                onClick={handleClose}
                variant="contained"
                sx={{ textTransform: "capitalize" }}
              >
                Cancel
              </Button>

              <Button
                onClick={confirmDeletePost}
                sx={{ ml: 1, textTransform: "capitalize" }}
                variant="contained"
                color="error"
              >
                <DeleteIcon
                  sx={{ color: theme.palette.error.contrastText, ml: "-10px" }}
                />
                Delete
              </Button>
            </Box>
          </Paper>
        </Modal>
      </Fragment>
    </>
  );
};
export default DeletePost;
