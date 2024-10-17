const express = require("express");
const { getAllUsers, registerUsers, loginUsers } = require("../Controllers/UserControllers");
const router = express.Router();

router.get("/allUser", getAllUsers);

router.post("/register", registerUsers);

router.post("/login", loginUsers);

module.exports = router;