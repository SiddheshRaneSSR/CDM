const mongoose=require("mongoose");


const userschema=new mongoose.Schema(
    {


      
          username:{
            type:"String",
            required:true      
          },
          email:{
            type:"String",
            required:true      
          },
          password:{
            type:"String",
            required:true      
          },
          phone:{
            type:"number",
            required:true
          },
          planspurchased:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"PLAN"
          }]


    }
)

module.exports=mongoose.model("users", userschema);
