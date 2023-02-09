const express = require("express");
const {Pool} = require('pg')
const bcrypt = require('bcrypt')
const cors = require('cors');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken')


const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'rksp',
    password: '1'
})


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const JWT = "MireaRKSP";

app.post("/register", (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const username = req.body.username;
    const password = bcrypt.hashSync(req.body.password, salt);
    const token = jwt.sign(username, JWT);
    pool.query("insert into users(username, password, token, role_id) values ($1, $2, $3, 3)", [username, password, token], (error, data) => {
        if (error)
            res.status(404).json({
                code: 404,
                message: error,
                data: {}
            });
        else res.json({
            code: 200,
            message: 'success',
            data: {
                token: token
            }
        });
    });
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    pool.query("select users.*, roles.title from users join roles on roles.id=users.role_id where username = $1", [username], (error, data) => {
        if (error)
            res.json(error);
        else if (!data.rows[0]) {
            res.status(401).json({
                code: 401,
                message: 'authorization failed',
                data: {}
            })
        } else {
            const user = data.rows[0];
            bcrypt.compare(password, user.password).then((data_) => {
                if (!data_) {
                    res.status(401).json({
                        code: 401,
                        message: 'wrong password',
                        data: {}
                    })
                } else {
                    jwt.verify(user.token, JWT, (error, decoded) => {
                        if (!error) {
                            const newToken = jwt.sign(user.username, JWT);
                            res.json({
                                code: 200,
                                message: 'success',
                                data: {
                                    token: newToken,
                                    role: user.title
                                }
                            });
                        } else {
                            console.log(error);
                            res.status(401).json({
                                code: 401,
                                message: 'authorization failed',
                                data: {
                                    error: error
                                }
                            })
                        }
                    });
                }
            });
        }
    });
});

app.get('/tasks', (req, res) => {
    pool.query("select tasks.*, users.username from tasks join users on users.id=tasks.user_id", (error, data) => {
        if (!error) {
            res.json({
                code: 200,
                message: 'success',
                data: {
                    tasks: data.rows
                }
            });
        } else {
            req.code(404).json({
                code: 404,
                message: 'error',
                data: {
                    message: error
                }
            });
        }
    });
});

app.post('/tasks', (req, res) => {
    const user = req.body.username;
    const description = req.body.description;
    let id = '';
    pool.query("select id from users where username = $1", [user], (error, data) => {
        if (!error) {
            id = data.rows[0].id;
            pool.query("insert into tasks (user_id, description) values ($1, $2)", [id, description], (error, data) => {
                if (!error) {
                    res.json({
                        code: 200,
                        message: 'success',
                        data: {}
                    });
                } else {
                    res.status(404).json({
                        code: 404,
                        message: 'error',
                        data: {
                            message: error
                        }
                    });
                }
            });
        } else {
            res.status(404).json({
                code: 404,
                message: 'error',
                data: {
                    message: error
                }
            });
        }
    });

});

app.delete('/tasks', (req, res) => {
    const id = req.body.id;
    console.log(id)
    pool.query("delete from tasks where id = $1", [id], (error, data) => {
        if (!error) {

            res.json({
                code: 200,
                message: 'success',
                data: {}
            });
        } else {
            res.status(404).json({
                code: 404,
                message: 'error',
                data: {
                    message: error
                }
            });
        }
    });

});

const PORT = 3002 || process.env.PORT;

app.listen(PORT, () => console.log("Server running on port " + PORT));