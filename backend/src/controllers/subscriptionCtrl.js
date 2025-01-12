const asyncHandler = require("express-async-handler");
const { pool } = require("../config/db.js");

// Create a new subscription
exports.createSubscription = asyncHandler(async (req, res) => {
  const { FullName, Email } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO Subscription (FullName, Email) VALUES (?, ?);`,
      [FullName, Email]
    );

    res.status(201).json({
      status: 201,
      message: "Subscription created successfully",
      id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create subscription",
      error: error.message || error,
    });
  }
});

// Get all subscriptions
exports.getSubscriptions = asyncHandler(async (req, res) => {
  try {
    const [result] = await pool.query(`SELECT * FROM Subscription;`);

    if (result.length > 0) {
      res.status(200).json({
        message: "Success",
        data: result,
      });
    } else {
      res.status(404).json({
        message: "No subscriptions found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch subscriptions",
      error: error.message || error,
    });
  }
});

// Get a subscription by ID
exports.getSubscriptionById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      `SELECT * FROM Subscription WHERE SubscriptionID = ?;`,
      [id]
    );

    if (result.length > 0) {
      res.status(200).json({
        message: "Success",
        data: result[0],
      });
    } else {
      res.status(404).json({
        message: "Subscription not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch subscription",
      error: error.message || error,
    });
  }
});

// Delete a subscription by ID
exports.deleteSubscriptionById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const [existingSubscription] = await pool.query(
      `SELECT * FROM Subscription WHERE SubscriptionID = ?;`,
      [id]
    );

    if (existingSubscription.length === 0) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    const [result] = await pool.query(
      `DELETE FROM Subscription WHERE SubscriptionID = ?;`,
      [id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Failed to delete subscription" });
    } else {
      res.status(200).json({
        message: "Subscription deleted successfully",
        id: id,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete subscription",
      error: error.message || error,
    });
  }
});
