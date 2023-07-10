const express =  require('express');
const config = require('config');

const appForEmps = express.Router();
const mysql = require('mysql');
var connection = mysql.createConnection({
    host     : config.get("host"),
    user     :  config.get("user"),
    password :  config.get("password"),
    database :  config.get("database")
   });


//GET = SELECT FROM DB
appForEmps.get("/", (request, response)=>{
    //response.send("EMPS GET IS CALLED");
    console.log("EMPS GET - Request Received...")
    connection.query("select * from Emp", (error, result)=>{
                if(error==null)
                {
                    var data = JSON.stringify(result) 
                    response.setHeader("Content-Type","application/json");
                    response.write(data);
                } 
                else
                {
                    console.log(error);
                    response.setHeader("Content-Type","application/json");
                    response.write(error)
                }
                response.end();
    })

})

//POST = INSERT INTO DB
appForEmps.post("/", (request, response)=>{
    // console.log("Data Received from Client / Browser / POSTMAN")
    // console.log(request.body)
    // response.send("EMPS POST IS CALLED");
    console.log("EMPS POST - Request Received...");
    console.log("Data Received is as below..")
    console.log(request.body)
    var query = 
    `insert into Emp values(${request.body.id}, '${request.body.ename}','${request.body.email}','${request.body.password}',${request.body.empid},'${request.body.dname}','${request.body.doj}')`;

    connection.query(query, (error, result)=>{
        if(error==null)
        {
            var data = JSON.stringify(result) 
            response.setHeader("Content-Type","application/json");
            response.write(data);
        } 
        else
        {
            console.log(error);
            response.setHeader("Content-Type","application/json");
            response.write(error)
        }
        response.end();
})
})

//PUT = UPDATE INTO DB
appForEmps.put("/:id", (request, response)=>{
    //response.send("EMPS PUT IS CALLED");
    console.log("EMPS PUT - Request Received...");
    console.log("Data Received is as below..")
    console.log(request.body)
    console.log(request.params)

    var query = 
    `update Emp set ename = '${request.body.ename}',
                    email = '${request.body.email}',
                    password='${request.body.password}',
                    empid = '${request.body.empid}',
                    dname='${request.body.dname}',
                    doj='${request.body.doj}'
                     where id = ${request.params.id}`;

    connection.query(query, (error, result)=>{
                        if(error==null)
                        {
                            var data = JSON.stringify(result) 
                            response.setHeader("Content-Type","application/json");
                            response.write(data);
                        } 
                        else
                        {
                            console.log(error);
                            response.setHeader("Content-Type","application/json");
                            response.write(error)
                        }
                        response.end();
                })
})

//DELETE  = DELETE FROM DB
appForEmps.delete("/:id", (request, response)=>{
    // response.send("EMPS DELETE IS CALLED");
    console.log("EMPS DELETE - Request Received...");
    console.log("Data Received is as below..")
    console.log(request.params)
    var query = 
    `delete from Emp where id = ${request.params.id}`;
                    
    connection.query(query, (error, result)=>{
                        if(error==null)
                        {
                            var data = JSON.stringify(result) 
                            response.setHeader("Content-Type","application/json");
                            response.write(data);
                        } 
                        else
                        {
                            console.log(error);
                            response.setHeader("Content-Type","application/json");
                            response.write(error)
                        }
                        response.end();
                })
})

module.exports = appForEmps;