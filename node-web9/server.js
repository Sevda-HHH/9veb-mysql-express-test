const express = require('express')
const mysql = require('mysql');
const cors = require('cors');
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'admin',
    database: 'users'
});

// connection.connect((err, res) => {
//     if (!err) {
//         console.log("SERVER SUCCESS")
//     } else {
//         console.log("error", err)
//     }
// });


app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
    console.log(request)
    response.send("Server response on / route")
})

const users = [
    { "name": "admin", "id": "1" },
    { "name": "user1", "id": "2" },
    { "name": "user2", "id": "3" }
]

app.get('/users', (request, response) => {
    connection.query('SELECT * from student ', (err, res) => {
        response.json(res)
    })
})

app.post('/users', (req,) => {
    connection.query(`INSERT into student (  name,classID) values ('${req.body.name}'  , ${req.body.classID} );`, (err, res) => {

        if (!err) {
            response.status(202).json(res)
        }

        if (err) {
            response.status(404).send(err)
        }

    })
})
app.put('/users/:id', (req, res) => {
    connection.query(`UPDATE classes 
    SET 
        name = '${req.body.name}'
    WHERE
        classes.id = ${req.params.id};`,
        (err, result) => {
            if (!err) {
                res.status(202).json(result)
            }

            if (err) {
                res.status(404).send(err)
            }
        })
})

app.get('/users/:id', (req, response) => {
    connection.query(`SELECT * from classes WHERE classes.id = ${req.params.id} `, (err, res) => {
        if (!err) {
            response.json(res)
        }
        
        if (err) {
            response.status(404).json(res) 
        }
    }) 
})

app.delete('/users/:id', (req, res) => {
    const result = users.find(el => el.id == req.params.id)
    console.log(result)
    res.send(result)
})
 
app.listen(3000, () => {
    console.log("Server started on :3000 port")
}) 