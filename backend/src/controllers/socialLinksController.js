const SocialLinks = require('../models/socialLinksModel');

// Get all social links
exports.getAllSocialLinks = (req, res) => {
  SocialLinks.getAll((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// Get a single social link by ID
exports.getSocialLinkById = (req, res) => {
  const { id } = req.params;
  SocialLinks.getById(id, (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).json({ message: 'Social link not found' });
    res.json(results[0]);
  });
};

// Create a new social link
exports.createSocialLink = (req, res) => {
  const socialLink = req.body;

  // Input validation for required fields
  if (!socialLink.platform_name || !socialLink.url) {
    return res.status(400).json({
      message: 'Platform name and URL are required fields',
    });
  }

  SocialLinks.create(socialLink, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: results.insertId, ...socialLink });
  });
};

// Update an existing social link
exports.updateSocialLink = (req, res) => {
  const { id } = req.params;
  const socialLink = req.body;

  SocialLinks.update(id, socialLink, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Social link updated successfully' });
  });
};

// Delete a social link
exports.deleteSocialLink = (req, res) => {
  const { id } = req.params;

  SocialLinks.delete(id, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Social link deleted successfully' });
  });
};
