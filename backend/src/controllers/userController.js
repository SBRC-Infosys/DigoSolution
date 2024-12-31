const { db, pool } = require('../config/db.js'); // Import the initialized Drizzle ORM instance
const { sql, eq } = require('drizzle-orm');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const { generateToken } = require('../config/jwtToken.js');
const sgMail = require('@sendgrid/mail');
const { generateOtp } = require('../utils/generateOtp.js');
const dotenv = require('dotenv');
const { validateOtp } = require('../utils/validateOtp.js');

dotenv.config();

// Function to add a new user to the `users` table
const addUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const [existingUser] = await db.execute(sql`
            SELECT * FROM users WHERE email = ${email}`);

    if (!existingUser.length) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const [result] = await db.execute(sql`
                    INSERT INTO users (username, email, password, role)
                    VALUES (${username}, ${email}, ${hashedPassword}, ${role});
                `);

      if (result.affectedRows === 1) {
        res.json({ message: "User created successfully" });
      } else {
        throw new Error("Failed to create user");
      }
    } else {
      throw new Error("User Already Exists");
    }
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const [user] = await db.execute(sql`
      SELECT * FROM users WHERE id = ${id};
    `);

    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ data: user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Failed to fetch user', error: error.message });
  }
});

const fetchUsers = asyncHandler(async (req, res) => {
  try {
    const [users] = await db.execute(sql`
        SELECT * FROM users;`);

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { username, email, password, role } = req.body;

  try {
    let updateFields = [];
    let updateValues = [];

    if (username) {
      updateFields.push('username = ?');
      updateValues.push(username);
    }
    if (email) {
      updateFields.push('email = ?');
      updateValues.push(email);
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.push('password = ?');
      updateValues.push(hashedPassword);
    }
    if (role) {
      updateFields.push('role = ?');
      updateValues.push(role);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    updateValues.push(id);

    const updateSql = `
          UPDATE users
          SET ${updateFields.join(', ')}
          WHERE id = ?`;

    const [result] = await pool.query(updateSql, updateValues);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const [updatedUser] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);

    res.json({ data: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const [userRows] = await db.execute(sql`
        SELECT * FROM users WHERE email = ${email}`);

    if (userRows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = userRows[0];
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user.id, user.email);

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const forgetPassword = asyncHandler(async (req, res, next) => {
  const email = req.body.email;

  try {
    const API_KEY = process.env.SENDGRID_API_KEY;
    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    sgMail.setApiKey(API_KEY);

    const msg = {
      to: email,
      from: "subashthakuri799@gmail.com",
      subject: "Your OTP for Password Reset",
      html: `Your OTP for resetting your password is <strong>${otp}</strong>.`,
    };

    await sgMail.send(msg);

    await pool.query(
      "INSERT INTO otp (email, otp, expires_at) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE otp = VALUES(otp), expires_at = VALUES(expires_at)",
      [email, otp, expiresAt]
    );

    res.status(200).json({ message: "OTP sent to email and saved to database." });
  } catch (error) {
    console.error("SendGrid error:", error.response?.body?.errors || error.message);
    res.status(500).json({ message: "Failed to send OTP email." });
    next(error);
  }
});

const resetPassword = asyncHandler(async (req, res, next) => {
  try {
    const { email, otp, password } = req.body;

    const isValid = await validateOtp(otp, email);

    if (isValid) {
      const [userRows] = await db.execute(sql`SELECT * FROM users WHERE email = ${email}`);

      if (userRows.length) {
        const hashedPassword = await bcrypt.hash(password, 10);

        await db.execute(sql`UPDATE users SET password = ${hashedPassword} WHERE email = ${email}`);
        await db.execute(sql`DELETE FROM otp WHERE email = ${email}`);

        res.status(200).json({ message: "Password reset successful." });
      } else {
        res.status(404).json({ message: "User not found." });
      }
    } else {
      res.status(400).json({ message: "Invalid OTP." });
    }
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Failed to reset password." });
  }
});

const deleteUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.execute(sql`
      DELETE FROM users WHERE id = ${id};
    `);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
});

module.exports = {
  addUser,
  getUserById,
  fetchUsers,
  updateUserById,
  loginUser,
  forgetPassword,
  resetPassword,
  deleteUserById,
};
