const express = require("express");
const {
  createSubscription,
  deleteSubscriptionById,
  getSubscriptions,
  getSubscriptionById,
} = require("../controllers/subscriptionCtrl.js");

const router = express.Router();

router.get("/", getSubscriptions);

router.get("/:id", getSubscriptionById);

router.post("/add", createSubscription);

router.delete("/delete/:id", deleteSubscriptionById);

module.exports = router;
