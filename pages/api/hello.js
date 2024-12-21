// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

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

connection.query(
  'SELECT * FROM `tcnmanagepass`',
  function (err, results, fields) {
    console.log(results); 
    console.log(fields); 
    res.status(200).json(results);
  }
);

  // res.status(200).json({ name: "John Doe" });


}
