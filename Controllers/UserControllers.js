const { userModel } = require("../Models/UserModel");
const bcrypt = require("bcrypt");

exports.getAllUsers = async (req, res) => {
    try {
        const user = await userModel.find({});
        return res.status(200).send({
            userCount: user.length,
            message: "Success",
            success: true,
            user,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error!!",
            success: false,
            error,
        })

    }
}

exports.registerUsers = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(200).send({
                success: false,
                message: "Please Fill All Feilds"
            });
        };
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(500).send({
                success: false,
                message: "Email Already Exist",
            });
        };
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await new userModel({ email, username, password: hashedPassword }).save();
        return res.status(201).send({
            success: true,
            message: "User registered Successfully",
            user
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error!!",
            error
        });

    }
}

exports.loginUsers = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(402).send({
                success: false,
                message: "Please Enter Feilds"
            })
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(500).send({
                success: false,
                message: "Email Not Found!!",
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid Username or Password!"
            })
        }
        return res.status(200).send({
            success: true,
            message: "Login Successful",
            user
        })

    } catch (error) {
        return res.status(403).send({
            message: "Error",
            success: false,
            error
        });
    };
};