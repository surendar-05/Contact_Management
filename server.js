const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv=require("dotenv").config();
const connect = require('./config/dbConnection')
connect()

const app=express();

app.use(express.json());

const port= process.env.PORT||5000;

app.use("/api/contacts",require("./routes/contactRoutes"))

app.use("/api/users",require("./routes/userRoutes"))

app.use(errorHandler)

app.listen(port,(req,res)=>{
    console.log(`port is rendered in ${port}`)
})