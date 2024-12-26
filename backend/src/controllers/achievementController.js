const Achievement = require('../models/achievementModel');

// Get all achievements
exports.getAllAchievements = (req, res) => {
    Achievement.getAllAchievements((err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(results);
    });
};

// Get an achievement by ID
exports.getAchievementById = (req, res) => {
    const id = req.params.id;
    Achievement.getAchievementById(id, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).json({ message: 'Achievement not found' });
        res.status(200).json(results[0]);
    });
};

// Create a new achievement
exports.createAchievement = (req, res) => {
    const { title, number } = req.body;
    Achievement.createAchievement(title, number, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ message: 'Achievement created successfully', id: results.insertId });
    });
};

// Update an achievement
exports.updateAchievement = (req, res) => {
    const id = req.params.id;
    const { title, number } = req.body;
    Achievement.updateAchievement(id, title, number, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Achievement not found' });
        res.status(200).json({ message: 'Achievement updated successfully' });
    });
};

// Delete an achievement
exports.deleteAchievement = (req, res) => {
    const id = req.params.id;
    Achievement.deleteAchievement(id, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Achievement not found' });
        res.status(200).json({ message: 'Achievement deleted successfully' });
    });
};
