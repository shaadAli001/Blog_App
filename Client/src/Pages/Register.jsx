import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
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
        "http://localhost:8080/api/v1/user/register",
        { username: input.name, email: input.email, password: input.password }
      );
      if (data.success) {
        alert("User Registered successfully");
        navigate("/login");
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
            Register
          </Typography>
          <TextField
            placeholder="Name"
            name="name"
            margin="normal"
            type="text"
            value={input.name}
            onChange={handleInputChange}
            required
          />
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
            onClick={() => navigate("/login")}
            sx={{ borderRadius: 1, marginTop: 3 }}
          >
            Already Registered ? Please Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Register;
