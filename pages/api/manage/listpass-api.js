// pages\api\manage\listpass-api.js
import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

export default async function handler(req, res) {
  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);
    const { method } = req;

    console.log("Request query:", req.query); // Log the query parameters

    switch (method) {
      case "GET":
        if (req.query.id) {
          await handleGetById(req, res, connection); // Fetch by ID
        } else {
          await handleGet(req, res, connection); // Regular GET
        }
        break;
      case "POST":
        await handlePost(req, res, connection);
        break;
      case "PUT":
        await handlePut(req, res, connection);
        break;
      case "DELETE":
        await handleDelete(req, res, connection);
        break;
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(500).json({ error: "Database connection failed" });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Existing GET handler for all records
async function handleGet(req, res, connection) {
  const { filter, searchQuery } = req.query;
  let query = "SELECT * FROM `tcnmanagepass` WHERE 1=1";
  const queryValues = [];

  if (filter && filter !== "All") {
    query += " AND FTUsrAgent = ?";
    queryValues.push(filter);
  }

  if (searchQuery) {
    query += " AND (FTUsrName LIKE ? OR FTUsrPass LIKE ?)";
    queryValues.push(`%${searchQuery}%`, `%${searchQuery}%`);
  }

  try {
    const [results] = await connection.execute(query, queryValues);
    if (results.length === 0) {
      return res.status(200).json({ message: "No data found" });
    }
    return res.status(200).json(results);
  } catch (error) {
    console.error("Error executing query:", error);
    return res.status(500).json({ error: "Database query failed" });
  }
}

// New GET handler to fetch data by ID
async function handleGetById(req, res, connection) {
  const { id } = req.query;
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM tcnmanagepass WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
}

// Existing POST handler
async function handlePost(req, res, connection) {
  const { FTUsrAgent, FTUsrName, FTUsrPass, FTRemark } = req.body;

  if (!FTUsrAgent || !FTUsrName || !FTUsrPass || !FTRemark) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const [result] = await connection.execute(
      "INSERT INTO `tcnmanagepass` (FTUsrAgent, FTUsrName, FTUsrPass, FTRemark) VALUES (?, ?, ?, ?)",
      [FTUsrAgent, FTUsrName, FTUsrPass, FTRemark]
    );
    return res.status(201).json({ message: "success", id: result.insertId });
  } catch (error) {
    console.error("Error inserting data:", error);
    return res.status(500).json({ error: "Failed to add record" });
  }
}

// Existing PUT handler
async function handlePut(req, res, connection) {
  const { id, FTUsrAgent, FTUsrName, FTUsrPass, FTRemark } = req.body;
  if (!id || !FTUsrAgent || !FTUsrName || !FTUsrPass || !FTRemark) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const [result] = await connection.execute(
      "UPDATE `tcnmanagepass` SET FTUsrAgent = ?, FTUsrName = ?, FTUsrPass = ?, FTRemark = ? WHERE id = ?",
      [FTUsrAgent, FTUsrName, FTUsrPass, FTRemark, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Record not found" });
    }
    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.error("Error updating data:", error.message);
    return res
      .status(500)
      .json({ error: "Failed to update record", details: error.message });
  }
}

// Existing DELETE handler
async function handleDelete(req, res, connection) {
  const { id } = req.query; 

  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }
  try {
    const [result] = await connection.execute(
      "DELETE FROM `tcnmanagepass` WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Record not found" });
    }
    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.error("Error deleting data:", error);
    return res.status(500).json({ error: "Failed to delete record" });
  }
}
