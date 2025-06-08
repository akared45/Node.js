const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'student'
});

db.connect((err) => {
    if (err) {
        console.error('MySQL connection error');
        return;
    }
    console.log('Connected to MySQL success');
});

app.get('/api/students', function(request, response) {
    const sqlQuery = 'SELECT * FROM student';

    db.query(sqlQuery, function(error, data) {
        if (error !== null) {
            response.send('Error');
        } else {
            response.send(data); 
        }
    });
});

app.post('/api/students', function(request, response) {
    const name = request.body.name;
    const age = request.body.age;
    const studentClass = request.body.class;
    const gender = request.body.gender;
    const birthdate = request.body.birthdate;

    const insertQuery = 'INSERT INTO student (name, age, class, gender, birthdate) VALUES (?, ?, ?, ?, ?)';
    const values = [name, age, studentClass, gender, birthdate];

    db.query(insertQuery, values, function(error, result) {
        if (error !== null) {
            console.log('Error', error);
            response.status(500).json({ message: 'Cannot add more student' });
        } else {
            const newStudentId = result.insertId;
            response.status(201).json({
                id: newStudentId,
                message: 'Add student success'
            });
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});