/* eslint-disable react/prop-types */

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import {
  Badge,
  Box,
  Menu,
  MenuItem,
  Paper,
  Tooltip,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import Comments from "./Comments";
import DeletePost from "./DeletePost";
import UpdatePost from "./UpdatePoste";
import { useState } from "react";
import { useEffect } from "react";


const Post = ({profil_image,userName,created_at,image,title,body,isProfile = false,authorId,comments_count,postId,}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [moreIcon, setMoreIcon] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [upModal, setUpModal] = useState(false);
  let navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/profile?userId=${id}`);
  };

  const theme = useTheme();
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openDelModal = () => {
    setDelModal(true);
  };

  const closeDelModal = () => {
    setDelModal(false);
  };

  const openUpModal = () => {
    setUpModal(true);
  };

  const closeUpModal = () => {
    setUpModal(false);
  };

  // check user powers to publictions
  useEffect(() => {
    let user = localStorage.getItem("user");
    const userObj = JSON.parse(user);
    if (userObj.id == authorId) {
      setMoreIcon(true);
    } else {
      setMoreIcon(false);
    }
  }, [authorId]);

  return (
    <>
      <Paper sx={{ boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.3);" }}>
        <Card
          sx={{
            Width: "100%",
            mt: 4,
          }}
        >
          <CardHeader
            sx={{ cursor: "pointer" }}
            avatar={
              <Avatar aria-label="recipe">
                <img
                  src={isProfile ? profil_image : profil_image}
                  onClick={() => {
                    handleClick(authorId);
                  }}
                />
              </Avatar>
            }
            action={
              <Tooltip title="Post settings">
                <IconButton>
                  {moreIcon ? (
                    <MoreVertIcon onClick={handleOpenUserMenu} />
                  ) : null}
                </IconButton>
              </Tooltip>
            }
            title={isProfile ? userName : userName}
            subheader={isProfile ? created_at : created_at}
          />

          <Box sx={{ flexGrow: 0 }}>
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
                  openUpModal();
                  handleCloseUserMenu();
                }}
              >
                <IconButton>
                  <EditIcon sx={{ color: theme.palette.primary.main }} />
                </IconButton>
                Edit
              </MenuItem>

              <MenuItem
                onClick={() => {
                  openDelModal();
                  handleCloseUserMenu();
                }}
              >
                <IconButton>
                  <DeleteIcon sx={{ color: theme.palette.error.main }} />
                </IconButton>
                Delete
              </MenuItem>
            </Menu>
          </Box>

          <CardMedia
            component="img"
            height="300"
            image={isProfile ? image : image}
            alt="No Photo"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {isProfile ? title : title}
              <br />
              {isProfile ? body : body}
            </Typography>
          </CardContent>
          <hr style={{ width: "70%" }} />
          <CardActions
            sx={{
              color: theme.palette.primary.main,
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <IconButton onClick={toggleOpen}>
              {isOpen ? (
                <ThumbUpAltIcon sx={{ color: theme.palette.primary.main }} />
              ) : (
                <ThumbUpOffAltIcon />
              )}
            </IconButton>

            <IconButton
              onClick={() => {
                handleOpen();
              }}
            >
              <Badge badgeContent={comments_count} color="primary">
                <AddCommentIcon sx={{ color: theme.palette.primary.main }} />
              </Badge>
            </IconButton>

            <IconButton>
              <ShareIcon sx={{ color: theme.palette.primary.main }} />
            </IconButton>
          </CardActions>
        </Card>
      </Paper>

      {open ? (
        <Comments open={open} postId={postId} handleClose={handleClose} />
      ) : null}
      {delModal ? (
        <DeletePost
          open={delModal}
          postId={postId}
          handleClose={closeDelModal}
        />
      ) : null}
      {upModal ? (
        <UpdatePost
          open={upModal}
          postId={postId}
          handleClose={closeUpModal}
          postBody={body}
          postTitle={title}
        />
      ) : null}
    </>
  );
};
export default Post;
