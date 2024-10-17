import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authAction } from "../Redux/Store";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/user/login",
        { email: input.email, password: input.password }
      );
      if (data.success) {
        localStorage.setItem("userId", data.user._id);
        localStorage.setItem("username", data.user.username);
        dispatch(authAction.login());
        alert("User Login successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={5}
        >
          <Typography
            textTransform={"uppercase"}
            variant="h4"
            textAlign="center"
          >
            Login
          </Typography>
          <TextField
            placeholder="Email"
            name="email"
            margin="normal"
            type="email"
            value={input.email}
            onChange={handleInputChange}
            required
          />
          <TextField
            placeholder="Password"
            name="password"
            margin="normal"
            type="password"
            value={input.password}
            onChange={handleInputChange}
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ borderRadius: 1, marginTop: 3 }}
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/register")}
            sx={{ borderRadius: 1, marginTop: 3 }}
          >
            Not Registered ? Please Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
