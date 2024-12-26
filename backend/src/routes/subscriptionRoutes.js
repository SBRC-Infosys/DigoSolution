const express = require('express');
const subscriptionController = require('../controllers/subscriptionController');

const router = express.Router();

// Define routes for subscriptions
router.get('/', subscriptionController.getAllSubscriptions);
router.get('/:id', subscriptionController.getSubscriptionById);
router.post('/', subscriptionController.createSubscription);
router.delete('/:id', subscriptionController.deleteSubscription);

module.exports = router;
