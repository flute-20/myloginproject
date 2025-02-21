// Required Modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
require('dotenv').config();

// App Setup
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});


// Connect to Database
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database.');
});

app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Register Endpoint
app.post('/register', (req, res) => {
    const { name, email, phone_no, password } = req.body;
    const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkUserQuery, [email], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json({ message: 'User already exists' });
        } else {
            const insertUserQuery = 'INSERT INTO users (name, email, phone_no, password) VALUES (?, ?, ?, ?)';
            db.query(insertUserQuery, [name, email, phone_no, password], (err) => {
                if (err) throw err;
                res.json({ message: 'Registration successful' });
            });
        }
    });
});
// Login Endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkUserQuery, [email], (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            res.json({ message: 'User does not exist' });
        } else {
            const user = results[0];
            if (user.password !== password) {
                res.json({ message: 'Incorrect password' });
            } else {
                res.json({ message: 'Login successful' });
            }
        }
    });
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// Dashboard Endpoint (Protected Route)
app.get('/dashboard', (req, res) => {
    res.sendFile(__dirname + '/dashboard.html');
});
