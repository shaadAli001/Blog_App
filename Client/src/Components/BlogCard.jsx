import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function BlogCard({
  time,
  title,
  description,
  image,
  username,
  id,
  isUser,
}) {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/blogEdit/${id}`);
  };
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/blog/deleteBlog/${id}`
      );
      if (data.success) {
        alert("Blog Deleted Successfully");
        navigate("/blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card
      sx={{
        display: "inline-block",
        width: "45%",
        height: "45%",
        m: 3,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover": { boxShadow: "10px 10px 20px #ccc" },
      }}
    >
      {isUser && (
        <Box display={"flex"}>
          <IconButton onClick={handleEdit} sx={{ ml: "auto" }}>
            <EditIcon color="primary"/>
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="error"/>
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Typography variant="subtitle1">
            <Box>{username}</Box>
            <Box>{time}</Box>
          </Typography>
        }
        title={
          <Typography
            sx={{ textAlign: "center", fontWeight: "bolder" }}
            variant="h4"
          >
            {title}
          </Typography>
        }
      />
      <CardMedia component="img" height="200" image={image} alt="Some Image" />
      <CardContent>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontWeight: "bold",
            lineHeight: "1.5",
            fontSize: "1.1rem",
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
