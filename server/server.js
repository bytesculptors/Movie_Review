const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = 3001

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud'
})

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

app.get('/api/get', (req, res) => {
    const sqlStatement = 'SELECT * FROM movie'
    db.query(sqlStatement, (err, results) => {
        res.send(results)
    })
})

app.post('/api/insert', (req, res) => {
    const movieName = req.body.movieName
    const review = req.body.review
    const sqlStatement = 'INSERT INTO movie (name, review) VALUES (?, ?)'
    db.query(sqlStatement, [movieName, review], (error, results) => {
        console.log(results);
    })
})

app.listen(port, () => {
    console.log(`App running on port ${port}`);
})

db.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('MySQL connected...');
    }
})