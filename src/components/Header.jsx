/* eslint-disable react/prop-types */
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useState } from "react";
import { useTheme } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import userImg from "/user.webp";


const Header = ({ setMode }) => {
  const theme = useTheme();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    function handleClick() {
      navigate("/login");
    }
    handleClick();
  };

  //get user id with local storage and use in profile page
  let user = localStorage.getItem("user");
  const userObj = JSON.parse(user);

  return (
    <AppBar
      sx={{
        bgcolor: theme.palette.primary.contrastText,
        color: theme.palette.text.primary,
        borderRadius: "0px 0px 8px 8px",
      }}
      position="fixed"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: "2px",
              fontSize: "40px",
              color: theme.palette.primary.dark,
            }}
          />
          <Typography
            onClick={() => {
              navigate("/home");
            }}
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              ml: 0,
              display: { xs: "none", md: "flex" },
              fontWeight: "bold",
              letterSpacing: ".1rem",
              color: theme.palette.primary.dark,
              textDecoration: "none",
              fontSize: "25px",
              cursor: "pointer",
            }}
          >
            Socialty
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              cursor={"pointer"}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  navigate("/home");
                }}
              >
                <Typography textAlign="center">Home</Typography>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  navigate(`/profile?userId=${userObj.id}`);
                }}
              >
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 0,
              color: theme.palette.primary.dark,
              fontSize: "30px",
            }}
          />
          <Typography
            onClick={() => {
              navigate("/home");
            }}
            variant="h5"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: "bold",
              color: theme.palette.primary.dark,
              textDecoration: "none",
            }}
          >
            Socialty
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => {
                navigate("/home");
              }}
              sx={{
                my: 2,
                color: theme.palette.text.primary,
                display: "block",
                fontWeight: "600",
                ml: 1,
              }}
            >
              HOME
            </Button>

            <Button
              onClick={() => {
                navigate(`/profile?userId=${userObj.id}`);
              }}
              sx={{
                my: 2,
                color: theme.palette.text.primary,
                display: "block",
                fontWeight: "600",
                ml: 1,
              }}
            >
              PROFILE
            </Button>
          </Box>

          <img
            style={{
              marginRight: "20px",
              width: "35px",
              height: "35px",
              borderRadius: "50%",
            }}
            alt=""
            src={userObj.profile_image ? userObj.profile_image : userImg}
          />

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <SettingsIcon sx={{ width: "35px", height: "35px" }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  logout();
                }}
              >
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>

              <MenuItem onClick={handleCloseUserMenu}>
                <IconButton
                  sx={{ textAlign: "center", ml: 1.5 }}
                  onClick={() => {
                    localStorage.setItem(
                      "currentMode",
                      theme.palette.mode === "dark" ? "light" : "dark"
                    );
                    setMode(theme.palette.mode === "dark" ? "light" : "dark");
                  }}
                  color="inherit"
                >
                  {theme.palette.mode === "dark" ? (
                    <LightModeIcon />
                  ) : (
                    <DarkModeIcon />
                  )}
                </IconButton>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
