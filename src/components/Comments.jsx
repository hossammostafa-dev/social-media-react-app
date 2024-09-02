/* eslint-disable react/prop-types */

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Modal,
  Paper,
  Snackbar,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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


const Comments = ({ postId, open, handleClose }) => {
  const theme = useTheme();
  let navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openalert, setOpenAlert] = useState({ show: false, message: "" });

  useEffect(() => {
    showComments(postId);
  }, [postId]);

  const showComments = async (id) => {
    try {
      const response = await axios.get(
        `https://tarmeezacademy.com/api/v1/posts/${id}`
      );
      console.log("Response:", response.data.data.comments);
      setComments(response.data.data.comments);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // show comments //>

  // add comments //
  const [commentValue, setCommentValue] = useState("");
  const addComment = async (id) => {
    const token = localStorage.getItem("token");
    let params = {
      body: commentValue,
    };

    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://tarmeezacademy.com/api/v1/posts/${id}/comments`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );
      console.log("Response:", response.data);
      showComments(postId);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setOpenAlert({ show: true, message: error.response.data.message });
      setIsLoading(false);
    }
  };

  const handleClick = (id) => {
    navigate(`/profile?userId=${id}`);
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

            <Typography
              color={"primary"}
              mt={3}
              variant="h4"
              fontWeight={"bold"}
            >
              Comments
            </Typography>
            <hr
              style={{
                width: "25%",
                height: "3px",
                position: "absolute",
                background: "#1565c0",
              }}
            />

            <Box mt={3} height={"70%"} overflow={"auto"}>
              {isLoading ? (
                <Box
                  sx={{ display: "flex", justifyContent: "center", mt: "30%" }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  {comments.length > 0 ? (
                    comments.map((comment) => (
                      <Box
                        key={comment.id}
                        display={"flex"}
                        flexDirection={"row"}
                        alignItems={"center"}
                        gap={1}
                        p={1}
                      >
                        <img
                          src={comment.author.profile_image}
                          width={"40px"}
                          height={"40px"}
                          style={{ borderRadius: "50%", cursor: "pointer" }}
                          onClick={() => {
                            handleClick(comment.author.id);
                          }}
                        />

                        <Box
                          bgcolor={theme.palette.background.default}
                          p={1}
                          borderRadius={2}
                        >
                          <Typography variant="body1" fontWeight={"bold"}>
                            {comment.author.username}
                          </Typography>
                          <Typography variant="body2">
                            {comment.body}
                          </Typography>
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Typography
                      display={"flex"}
                      justifyContent={"center"}
                      mt={"30%"}
                      color={theme.palette.info.light}
                      variant="h5"
                    >
                      No Comments
                    </Typography>
                  )}
                </>
              )}
            </Box>

            <Stack direction={"row"} gap={1} mt={2}>
              <input
                style={{
                  width: "80%",
                  borderRadius: "5px",
                  border: "none",
                  padding: "10px",
                  background: theme.palette.background.default,
                }}
                type="text"
                placeholder="add comment..."
                value={commentValue}
                onChange={(event) => {
                  setCommentValue(event.target.value);
                }}
              />

              <Button
                onClick={() => {
                  addComment(postId);
                }}
                variant="contained"
                endIcon={<SendIcon />}
              >
                Send
              </Button>
            </Stack>
          </Paper>
        </Modal>
      </Fragment>
    </>
  );
};
export default Comments;
