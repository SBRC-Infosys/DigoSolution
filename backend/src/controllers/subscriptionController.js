const Subscription = require('../models/subscriptionModel');

// Get all subscriptions
exports.getAllSubscriptions = (req, res) => {
  Subscription.getAll((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// Get a single subscription by ID
exports.getSubscriptionById = (req, res) => {
  const { id } = req.params;
  Subscription.getById(id, (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).json({ message: 'Subscription not found' });
    res.json(results[0]);
  });
};

// Create a new subscription
exports.createSubscription = (req, res) => {
  const subscription = req.body;

  // Input validation for required fields
  if (!subscription.Email) {
    return res.status(400).json({
      message: 'Email is required',
    });
  }

  Subscription.create(subscription, (err, results) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'Email already subscribed' });
      }
      return res.status(500).send(err);
    }
    res.status(201).json({ id: results.insertId, ...subscription });
  });
};

// Delete a subscription
exports.deleteSubscription = (req, res) => {
  const { id } = req.params;

  Subscription.delete(id, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Subscription deleted successfully' });
  });
};
