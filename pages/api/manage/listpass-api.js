// pages/api/manage/listpass-api.js

import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
});

export default function handler(req, res) {
  const { filter, searchQuery } = req.query;
  let query = 'SELECT * FROM `tcnmanagepass` WHERE 1=1';

  const queryValues = [];
  
  // หากเลือก "All" หรือไม่มี filter, จะไม่กรอง
  if (filter && filter !== "All") {
    query += ` AND FTUsrAgent = ?`; // เปรียบเทียบค่าตรง
    queryValues.push(filter);
  }

  // ถ้ามีการค้นหา
  if (searchQuery) {
    query += ` AND (FTUsrName LIKE ? OR FTUsrPass LIKE ?)`;
    queryValues.push(`%${searchQuery}%`);
    queryValues.push(`%${searchQuery}%`);
  }

  connection.query(query, queryValues, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database query failed' });
    }

    // ตรวจสอบให้มั่นใจว่ามีการส่งผลลัพธ์กลับ
    if (results.length === 0) {
      return res.status(200).json({ message: 'No data found' });
    }
    
    return res.status(200).json(results);
  });
}
