const db = require('../config/db');

// Get all achievements
exports.getAllAchievements = (callback) => {
    const query = 'SELECT * FROM Achievements';
    db.query(query, callback);
};

// Get an achievement by ID
exports.getAchievementById = (id, callback) => {
    const query = 'SELECT * FROM Achievements WHERE AchievementID = ?';
    db.query(query, [id], callback);
};

// Create a new achievement
exports.createAchievement = (title, number, callback) => {
    const query = 'INSERT INTO Achievements (Title, Number) VALUES (?, ?)';
    db.query(query, [title, number], callback);
};

// Update an achievement
exports.updateAchievement = (id, title, number, callback) => {
    const query = 'UPDATE Achievements SET Title = ?, Number = ? WHERE AchievementID = ?';
    db.query(query, [title, number, id], callback);
};

// Delete an achievement
exports.deleteAchievement = (id, callback) => {
    const query = 'DELETE FROM Achievements WHERE AchievementID = ?';
    db.query(query, [id], callback);
};
