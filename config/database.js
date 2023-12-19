const mongoose=require("mongoose");


const dbconnect=()=>{
    mongoose.connect(process.env.DATABASE_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 5000,
        socketTimeoutMS: 20000,
        heartbeatFrequencyMS: 10000,
        retryWrites: true,
        w: "majority",
    })
    .then(()=>{
        console.log("connection established ")
    })
    .catch((error)=>{
        console.log(error)
    })
}

module.exports=dbconnect;