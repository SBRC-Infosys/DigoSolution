const express = require("express");
const {
  addUser,
  deleteUserById,
  fetchUsers,
  forgetPassword,
  getUserById,
  loginUser,
  resetPassword,
  updateUserById,
} = require("../controllers/userController.js");

const router = express.Router();

router.post("/register", addUser);

router.get("/", fetchUsers);

router.get("/:id", getUserById);

router.patch("/update/:id", updateUserById);

router.post("/login", loginUser);

router.post("/forget-password", forgetPassword);

router.post("/reset", resetPassword);

router.delete("/delete/:id", deleteUserById);

module.exports = router;
