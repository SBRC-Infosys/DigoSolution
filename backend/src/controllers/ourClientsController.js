const asyncHandler = require("express-async-handler");
const { db } = require("../config/db.js");
const { sql } = require("drizzle-orm");
const {
  uploadOnCloudinary,
  deleteCloudinaryImage,
} = require("../services/cloudinary.js");

// Add a new client
exports.addClient = asyncHandler(async (req, res) => {
  const { CompanyName } = req.body;

  try {
    // Upload logo to Cloudinary if provided
    let logo = null;
    if (req.file) {
      const uploadResult = await uploadOnCloudinary(req.file.path);
      logo = uploadResult.secure_url;
    }

    const [result] = await db.execute(sql`
      INSERT INTO OurClients (CompanyName, Logo)
      VALUES (${CompanyName}, ${logo});
    `);

    const insertedId = result.insertId;

    // Fetch the inserted client details
    const [rows] = await db.execute(sql`
      SELECT * FROM OurClients WHERE ClientID = ${insertedId};
    `);

    res.json({
      status: 200,
      message: "Client added successfully",
      client: rows[0],
    });
  } catch (error) {
    console.error("Error adding client:", error);
    res.status(500).json({ message: "Failed to add client" });
  }
});

// Get all clients
exports.getClients = asyncHandler(async (req, res) => {
  try {
    const [rows] = await db.execute(sql`
      SELECT * FROM OurClients;
    `);

    if (rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No clients found",
      });
    }

    res.json({
      status: 200,
      message: "Clients fetched successfully",
      clients: rows,
    });
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ message: "Failed to fetch clients" });
  }
});

// Get client by ID
exports.getClientById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.execute(sql`
      SELECT * FROM OurClients WHERE ClientID = ${id};
    `);

    if (rows.length > 0) {
      res.json({
        status: 200,
        message: "Client fetched successfully",
        client: rows[0],
      });
    } else {
      res.status(404).json({ message: "Client not found" });
    }
  } catch (error) {
    console.error("Error fetching client:", error);
    res.status(500).json({ message: "Failed to fetch client" });
  }
});

exports.updateClient = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { CompanyName, logo: logoFromBody } = req.body;

  try {
    let logo = logoFromBody || null; // Fallback to null if logo is not provided
    if (req.file) {
      try {
        const uploadResult = await uploadOnCloudinary(req.file.path);
        logo = uploadResult.secure_url;
      } catch (uploadError) {
        console.error("Error uploading logo to Cloudinary:", uploadError);
        return res.status(500).json({ message: "Failed to upload logo" });
      }
    }

    const [result] = await db.execute(sql`
      UPDATE OurClients
      SET CompanyName = ${CompanyName}, Logo = ${logo}
      WHERE ClientID = ${id};
    `);

    if (result.affectedRows > 0) {
      const [rows] = await db.execute(sql`
        SELECT * FROM OurClients WHERE ClientID = ${id};
      `);

      res.json({
        status: 200,
        message: "Client updated successfully",
        client: rows[0],
      });
    } else {
      res.status(404).json({ message: "Client not found" });
    }
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ message: "Failed to update client" });
  }
});

// Delete client
exports.deleteClient = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the client details to delete the logo from Cloudinary
    const [rows] = await db.execute(sql`
      SELECT * FROM OurClients WHERE ClientID = ${id};
    `);

    if (rows.length > 0) {
      const client = rows[0];
      if (client.Logo) {
        await deleteCloudinaryImage(client.Logo);
      }

      const [result] = await db.execute(sql`
        DELETE FROM OurClients WHERE ClientID = ${id};
      `);

      if (result.affectedRows > 0) {
        res.json({
          status: 200,
          message: "Client deleted successfully",
        });
      } else {
        res.status(404).json({ message: "Client not found" });
      }
    } else {
      res.status(404).json({ message: "Client not found" });
    }
  } catch (error) {
    console.error("Error deleting client:", error);
    res.status(500).json({ message: "Failed to delete client" });
  }
});
