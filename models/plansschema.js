const mongoose=require("mongoose");


const planschema=new mongoose.Schema(
    {

        userid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users"
        },
        planname:{
            type:String,
            enum:["Basic","standdard","premium"],
            required:"true"

        },
        imagestorage:{
            type:Number,
            required:true
        },
        videostorage:{
            type:Number,
            required:true
        },
        description:{
            type:String
        },
        price:{
            type:Number,
            required:true
        }

      


    }
)

module.exports=mongoose.model("PLAN", planschema);
