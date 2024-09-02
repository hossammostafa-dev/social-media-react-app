import {
  Avatar,
  Box,
  Container,
  createTheme,
  CssBaseline,
  Paper,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Post from "../components/Post";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Header from "../components/Header";
import { grey } from "@mui/material/colors";
import CreatePost from "../components/CreatePost";
import userImg from "/user.webp";

const Profile = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let id = urlParams.get("userId");

  //const theme = useTheme()
  const [response1, setResponse1] = useState(null);
  const [response2, setResponse2] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(
          `https://tarmeezacademy.com/api/v1/users/${id}`
        );
        const response2 = await axios.get(
          `https://tarmeezacademy.com/api/v1/users/${id}/posts`
        );
        setResponse1(response1.data.data);
        setResponse2(response2.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const [mode, setMyMode] = useState(localStorage.getItem("currentMode"));
  const darkTheme = createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            background: {
              default: grey[100],
            },
          }
        : {
            // palette values for dark mode
          }),
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <Header setMode={setMyMode} />
        <CreatePost />
        <Container maxWidth="md">
          <Paper sx={{ mt: "80px", flexGrow: 1 }}>
            <Stack
              boxShadow={"0 5px 8px 0 rgba(0, 0, 0, 0.3);"}
              direction={"row"}
              justifyContent={"space-evenly"}
              width={"100%"}
              height={"100%"}
              borderRadius={2}
            >
              <Box
                width={"200px"}
                height={"200px"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Avatar
                  src={response1 ? response1.profile_image : userImg}
                  sx={{ width: "80%", height: "80%" }}
                />
              </Box>

              <Box
                width={"30%"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-evenly"}
                alignItems={"center"}
                sx={{ flexFlow: "auto" }}
              >
                <Typography variant="body1" fontWeight={"500"}>
                  {response1 ? response1.name : "..."}
                </Typography>
                <Typography variant="body1" fontWeight={"500"}>
                  {response1 ? response1.username : "..."}
                </Typography>
              </Box>

              <Box
                width={"30%"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-evenly"}
                alignItems={"center"}
              >
                <Typography variant="body1" fontWeight={"300"}>
                  <span style={{ fontSize: "50px", fontWeight: "100" }}>
                    {response1 ? response1.posts_count : 0}
                  </span>
                  post
                </Typography>
                <Typography variant="body1" fontWeight={"300"}>
                  <span style={{ fontSize: "50px", fontWeight: "100" }}>
                    {response1 ? response1.comments_count : 0}
                  </span>
                  comment
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Container>

        <Container maxWidth="sm">
          <Box sx={{ mt: 3, flexGrow: 1 }}>
            <Typography variant="h5" fontWeight={"bold"} mt={2}>
              {response1 ? response1.username : "..."} posts
            </Typography>

            {response2 ? (
              response2.map((post) => {
                return (
                  <Post
                    key={post.id}
                    profil_image={post.author.profile_image}
                    userName={post.author.username}
                    created_at={post.created_at}
                    image={post.image}
                    title={post.title}
                    body={post.body}
                    comments_count={post.comments_count}
                    isProfile={true}
                    postId={post.id}
                    authorId={id}
                  />
                );
              })
            ) : response2 == null ? (
              <Typography textAlign={"center"} mt={4} variant="h3">
                No Posts
              </Typography>
            ) : (
              <Loading />
            )}
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};
export default Profile;
