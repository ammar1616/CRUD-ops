const { log } = require("console")
const express = require("express")
const app = express()
app.use(express.json())


const mysql = require("mysql2")
const query = mysql.createConnection({
    host: "localhost",
    database: "week2_task0",
    user: "root",
    password: ""
})

app.post("/adduser", (req, res) => {
    query.execute(`insert into users (name,email,password,gender) values ('${req.body.name}','${req.body.email}','${req.body.password}','${req.body.gender}')`)
    console.log("zy l fol added tmam")
    res.send("user added successfully")
})

app.get("/getusersdata", (req, res) => {
    query.execute(`select * from users`, (err, data) => {
        res.json(data)
    })
    console.log("data retrieved")
})

app.post("/getuserpassword", (req, res) => {
    query.execute(`select password from users where name = '${req.body.name}'`, (err, data) => {
        res.send(data)
    })
    console.log("password retrieved")
})

app.post("/updatepassword", (req, res) => {
    query.execute(`update users set password ='${req.body.password}' where name = '${req.body.name}'`)
    console.log("password changed")
    res.send("password updated")
})

app.post("/updatename", (req, res) => {
    query.execute(`update users set name='${req.body.newname}' where name='${req.body.name}'`)
    res.send("username changed successfully")
})

app.post("/deleteuserbyname", (req, res) => {
    query.execute(`delete from users where name='${req.body.name}'`)
    res.send("user deleted successfully")
})

app.post("/deleteuserbyid", (req, res) => {
    query.execute(`delete from users where id='${req.body.id}'`)
    res.send("user deleted successfully")
})


app.listen(5555)