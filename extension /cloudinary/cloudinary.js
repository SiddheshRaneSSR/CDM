const cloudinary=require("cloudinary").v2;

require("dotenv").config();
const cloudconnect=()=>
{
    try{

    
    cloudinary.config({

        cloud_name:"dnwqym95g",
        api_key:'712521688222936',
        api_secret:"_zcpxd16qThF3xyH7SUzkmOlzKo"


    })

    console.log("cloud is connected")
    }
    catch(error)
    {
        console.log(error);
    }
}

module.exports=cloudconnect;