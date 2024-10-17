import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";

const EditBlog = () => {
  const [blog, setBlog] = useState([]);

  const [input, setInput] = useState({});
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const id = useParams().id;

  const getBlogDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/blog/readBlog/${id}`
      );
      if (data.success) {
        setBlog(data.blog);
        setInput({
          title: data.blog.title,
          description: data.blog.description,
          image: data.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/blog/updateBlog/${id}`,
        {
          title: input.title,
          description: input.description,
          image: input.image,
          user: userId,
        }
      );
      if (data.success) {
        alert("Blog Upated Successfully ");
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
  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
    getBlogDetails();
  }, [id]);
  console.log(blog);

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
            Update Post
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
            color="warning"
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      </form>{" "}
    </>
  );
};

export default EditBlog;
