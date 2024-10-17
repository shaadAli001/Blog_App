import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../Components/BlogCard";
import { useNavigate } from "react-router-dom";

const UserBlog = () => {
  const [blog, setBlog] = useState([]);
  const navigate = useNavigate();
  const id = localStorage.getItem("userId");

  const getBlogs = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/blog/userBlog/${id}`
      );
      if (data.success) {
        setBlog(data.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!id) {
      navigate("/login");
    }
    getBlogs();
  }, []);
  return (
    <>
      {blog && blog.length > 0 ? (
        blog.map((blog) => (
          <BlogCard
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            time={blog.createdAt.slice(0, 10)}
          />
        ))
      ) : (
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          No Blog Created
        </h1>
      )}
    </>
  );
};

export default UserBlog;
