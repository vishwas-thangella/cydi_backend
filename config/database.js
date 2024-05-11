const mongoose = require("mongoose");

const connectTodb = async () =>{
    try{    
        await mongoose.connect("mongodb://localhost:27017/cydi").then(resp=>{
            console.log(`Db connected to ${resp.connection.host}`);
        })
    }catch(e){
        console.log(e.message)
    }
}

module.exports = connectTodb;