const express = require("express");
const { getAllBlogController, createAllBlogController,
    readAllBlogController, deleteAllBlogController,
    updateAllBlogController, userBlogController }
    = require("../Controllers/BlogController");

const router = express.Router();

// get All Blog
router.get("/allBlog", getAllBlogController);

// Create Blog
router.post("/createBlog", createAllBlogController);

// Read Blog
router.get("/readBlog/:id", readAllBlogController);

// Update Blog
router.put("/updateBlog/:id", updateAllBlogController);

// delete Blog
router.delete("/deleteBlog/:id", deleteAllBlogController);

// Get user Blog
router.get("/userBlog/:id", userBlogController)

module.exports = router;