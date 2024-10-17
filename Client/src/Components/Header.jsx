import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authAction } from "../Redux/Store";

const Header = () => {
  // global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      dispatch(authAction.logout());
      // localStorage.removeItem("userId");
      alert("Logout Successful!!");
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const username = localStorage.getItem("username");
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h4">My Blog App</Typography>
          {isLogin && (
            <>
              <Box display={"flex"} marginRight="auto" marginLeft="auto">
                <Tabs
                  textColor="inherit"
                  value={value}
                  onChange={(e, val) => setValue(val)}
                >
                  <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                  <Tab label="My Blogs" LinkComponent={Link} to="/Myblogs" />
                  <Tab
                    label="Create Blog"
                    LinkComponent={Link}
                    to="/createBlog"
                  />
                </Tabs>
              </Box>
            </>
          )}
          <Box display={"flex"} marginLeft="auto">
            {!isLogin && (
              <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}
            {isLogin && (
              <>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ display: "flex", color: "white", margin: 1 }}
                  >
                    <AccountCircleIcon sx={{ fontSize: "2rem" }} />
                    <Box>{username}</Box>
                  </Typography>
                </Box>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
