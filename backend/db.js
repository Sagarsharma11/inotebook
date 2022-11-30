const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/mydatabase"

const connectMongo = () =>{
    mongoose.connect(uri, ()=>{
        console.log("connected..............")
    })
}



module.exports = connectMongo;