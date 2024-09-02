import ContainerPost from "./ContainerPost";
import Header from "./Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import { CssBaseline } from "@mui/material";
import { grey } from "@mui/material/colors";
import CreatePost from "./CreatePost";

const Home = () => {
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
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Header setMode={setMyMode} />
      <ContainerPost />
      <CreatePost />
    </ThemeProvider>
  );
};
export default Home;
