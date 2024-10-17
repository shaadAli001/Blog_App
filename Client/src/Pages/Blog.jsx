import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../Components/BlogCard";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/blog/allBlog"
      );
      if (data.success) {
        setBlogs(data.blog);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
    getAllBlogs();
  }, []);

  return (
    <div>
      {blogs &&
        blogs.map((blog) => (
          <BlogCard
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username}
            time={blog.createdAt.slice(0, 10)}
          />
        ))}
    </div>
  );
};

export default Blog;
