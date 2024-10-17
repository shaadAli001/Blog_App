const { default: mongoose } = require("mongoose");
const { BlogModel } = require("../Models/BlogModel");
const { userModel } = require("../Models/UserModel");

exports.getAllBlogController = async (req, res) => {
    try {
        const blog = await BlogModel.find({}).populate("user");
        if (!blog) {
            return res.status(401).send({
                success: false,
                message: "No Blog Found"
            })
        }
        return res.status(200).send({
            BlogCount: blog.length,
            success: true,
            message: "All Blogs",
            blog
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "error!!",
            error
        })

    }
}

exports.createAllBlogController = async (req, res) => {
    try {
        const { title, description, image, user } = req.body;
        if (!title || !description || !image || !user) {
            return res.status(401).send({
                success: false,
                message: "Please Fill All Feilds",
            });
        };
        const existingUser = await userModel.findById(user);
        if (!existingUser) {
            return res.status(401).send({
                success: false,
                message: "User Dosen't Exist"
            })
        }

        const newBlog = new BlogModel({ title, description, image, user });
        const session = await mongoose.startSession();

        session.startTransaction();
        await newBlog.save({ session });
        existingUser.blogs.push(newBlog);

        await existingUser.save({ session });
        await session.commitTransaction();
        await newBlog.save();

        return res.status(200).send({
            success: true,
            message: "New Blog Created",
            newBlog
        });

    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            message: "Error",
            error
        })
    }
}


exports.readAllBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await BlogModel.findById(id);
        if (!blog) {
            return res.status(400).send({
                success: false,
                message: "Blog Not Found!!"
            })
        }
        return res.status(200).send({
            success: true,
            message: "Blog Found Successfully",
            blog
        })

    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            message: "Error",
            error
        })
    }
}

exports.updateAllBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image } = req.body;
        const updatedBlog = await BlogModel.findByIdAndUpdate(id, { ...req.body }, { new: true })
        return res.status(202).send({
            success: true,
            message: "Blog Updated Successfully",
            updatedBlog
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error While Updation",
        });
    }
}

exports.deleteAllBlogController = async (req, res) => {
    try {
        const blog = await BlogModel.findByIdAndDelete(req.params.id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).send({
            success: true,
            message: "Blog Deleted Successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error While Deletion",
        });
    }
}

exports.userBlogController = async (req, res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate("blogs");
        if (!userBlog) {
            return res.status(500).send({
                success: false,
                message: "No blogs Found!!"
            })
        }
        return res.status(200).send({
            success: true,
            message: "success",
            userBlog
        })
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error While Deletion",
        });
    }
}