// next-js-bet/pages/api/manage/search/[id].js

// Create the connection to database
// Get the client
const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
});
export default function handler(req, res) {
  const { id } = req.query
connection.query(
  'SELECT * FROM `tcnmanagepass` WHERE `id` = ?', [id],
  function (err, results, fields) {
    console.log(results); 
    console.log(fields); 
    res.status(200).json(results);
  }
);

  // res.status(200).json({ name: "John Doe" });


}
