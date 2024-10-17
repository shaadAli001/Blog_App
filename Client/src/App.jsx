import React from "react";
import Header from "./Components/Header";
import { Route, Routes } from "react-router-dom";
import Blog from "./Pages/Blog";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import UserBlog from "./Pages/UserBlog";
import CreateBlog from "./Pages/CreateBlog";
import EditBlog from "./Pages/EditBlog";
const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/Myblogs" element={<UserBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createBlog" element={<CreateBlog />} />
        <Route path="/blogEdit/:id" element={<EditBlog />} />
      </Routes>
    </>
  );
};

export default App;
