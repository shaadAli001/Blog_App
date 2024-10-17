import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    image: "",
  });
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/blog/createBlog",
        {
          title: input.title,
          description: input.description,
          image: input.image,
          user:userId
        }
      );
      if (data.success) {
        alert("Blog Created ");
        navigate("/Myblogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          width="50%"
          border={3}
          borderRadius={10}
          padding={3}
          margin="auto"
          marginTop={"30px"}
          boxShadow={"10px 10px 20px #ccc"}
          display={"flex"}
          flexDirection={"column"}
        >
          <Typography
            variant="h2"
            textAlign={"center"}
            fontWeight={"bold"}
            padding={3}
            color="gray"
          >
            Create A Post
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            value={input.title}
            name="title"
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />

          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>

          <TextField
            minRows={2}
            padding={"1rem"}
            value={input.description}
            name="description"
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />

          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Image URL
          </InputLabel>

          <TextField
            value={input.image}
            name="image"
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <Button
            sx={{ marginTop: "1rem" }}
            type="submit"
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateBlog;
