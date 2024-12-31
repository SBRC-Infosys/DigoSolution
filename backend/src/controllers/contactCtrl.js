const asyncHandler = require('express-async-handler');
const dotenv = require('dotenv');
const { pool } = require('../config/db.js');

dotenv.config();

exports.getContacts = asyncHandler(async(req, res)=>{
  try {
    
      const [rows] = await pool.query(`SELECT * FROM contact_form;`);
  
      res.json({
        status: 200,
        data: rows
      });
    
  } catch (error) {
    console.error('Error retriving contacts:', error);
    res.status(500).json({ message: 'Failed to retrieve contacts' });
  }
})

exports.getContactById = asyncHandler(async(req, res)=>{
  const {id} = req.params;

  try {
    
      const [rows] = await pool.query(`SELECT * FROM contact_form WHERE id = ?;`,[id]);
  
      res.json({
        status: 200,
        data: rows
      });
    
  } catch (error) {
    console.error('Error retriving contacts:', error);
    res.status(500).json({ message: 'Failed to retrieve contacts' });
  }
})

exports.createContact = asyncHandler(async (req, res, next) => {
  const { name, email, phone, address, subject, message } = req.body;

  try {
      // const name = `${firstname} ${lastname}`;
      const [result] = await pool.query(
        `INSERT INTO contact_form (name, email, phone, address, subject, message) VALUES (?, ?, ?, ?, ?, ?);`,
        [name, email, phone, address, subject, message]
      );

      if (result.affectedRows > 0) {
        return res.json({
          status: 200,
          message: 'Successful contact',
          // data: result
        });
      }

  } catch (error) {
    console.error('Error sending contact message:', error);
    res.status(500).json({ message: 'Failed to send the contact message' });
  }
});



exports.updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params; // Get the contact ID from the URL
  const fieldsToUpdate = req.body; // Object containing the fields to update

  if (Object.keys(fieldsToUpdate).length === 0) {
    return res.status(400).json({
      status: 400,
      message: 'No fields provided to update'
    });
  }

  // Dynamically construct the SQL query based on the fields present in the request
  const setClause = Object.keys(fieldsToUpdate)
    .map(field => `${field} = ?`)
    .join(', ');

  const values = Object.values(fieldsToUpdate);

  try {
    const [result] = await pool.query(
      `UPDATE contact_form SET ${setClause} WHERE id = ?;`,
      [...values, id]
    );

    if (result.affectedRows > 0) {
      return res.json({
        status: 200,
        message: 'Contact updated successfully'
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: 'Contact not found'
      });
    }
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ message: 'Failed to update contact' });
  }
});


// --------------------------------------
// Delete (DELETE): Remove a contact by ID
// --------------------------------------
exports.deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params; // Get the contact ID from the URL

  try {
    const [result] = await pool.query(`DELETE FROM contact_form WHERE id = ?;`, [id]);

    if (result.affectedRows > 0) {
      return res.json({
        status: 200,
        message: 'Contact deleted successfully'
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: 'Contact not found'
      });
    }
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: 'Failed to delete contact' });
  }
});